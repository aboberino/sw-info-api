import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { writeToFile } from '../utils/utils'

async function saveCommandToFile(req: Request, res: Response) {
  const { body } = req
  console.log(req)
  if (!Object.keys(body).length) return res.status(400).send('body is empty')

  const command = body.req.command
  body.resp.unit_list = []

  const data = { command, body }

  try {
    // Save to DungeonCount

    writeToFile('logs.json', data)
    res.send({ status: 'OK', data: data })
  } catch (error) {
    console.error(error)
    res.status(500).send({ status: 'FAILED', data: null, error })
  }
}

async function registerCommand(req: Request, res: Response) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'FAILED', errors: errors.array() })
  }

  const {
    params: { commandName, wizardId },
    body
  } = req

  console.log(commandName, wizardId)

  const id = parseInt(wizardId)

  if (commandName !== 'BattleDungeonResult_V2') return res.status(400).send('can only register BattleDungeonResult_V2')

  const wizardInfo = body?.resp?.wizard_info

  // save logs of command to DungeonCount
  // check if dungeoncount exists and create if not

  try {
    const dungeonCount = await prisma.dungeonCount.upsert({
      where: {
        wizardId_dungeonId_stageId: {
          wizardId: id,
          dungeonId: body?.req?.dungeon_id,
          stageId: body?.req?.stage_id
        }
      },
      create: {
        wizardId: id,
        dungeonId: body?.req?.dungeon_id,
        stageId: body?.req?.stage_id,
        clearTimeAverage: body?.req?.clear_time,
        win: body?.req?.win_lose === 1 ? 1 : 0,
        lose: body?.req?.win_lose === 0 ? 1 : 0 // 0 or 1
      },
      update: {
        clearTimeAverage: body?.req?.clear_time,
        win: {
          increment: body?.req?.win_lose === 1 ? 1 : 0
        },
        lose: {
          increment: body?.req?.win_lose === 0 ? 1 : 0
        }
      }
    })

    // upsert BattleDungeonHisto
    const upsertedBattle = await prisma.battleDungeonHisto.create({
      data: {
        wizardId: id,
        dungeonId: body?.req?.dungeon_id,
        stageId: body?.req?.stage_id,
        winLose: body?.req?.win_lose === 1 ? true : false,
        autoRepeat: body?.req?.auto_repeat,
        clearTime: body?.req?.clear_time
      }
    })

    const wizard = {
      wizardName: wizardInfo?.wizard_name,
      wizardMana: wizardInfo?.wizard_mana,
      wizardCrystal: wizardInfo?.wizard_crystal,
      wizardCrystalPaid: wizardInfo?.wizard_crystal_paid,
      wizardLevel: wizardInfo?.wizard_level,
      wizardEnergy: wizardInfo?.wizard_energy,
      wizardEnergyMax: wizardInfo?.energy_max,
      arenaEnergy: wizardInfo?.arena_energy,
      eventCoin: wizardInfo?.event_coin
    }

    // update info of user
    const upsertedWizard = await prisma.wizard.upsert({
      where: {
        wizardId: id
      },
      create: {
        wizardId: id,
        ...wizard
      },
      update: wizard
    })
    res.send({ status: 'OK', data: upsertedWizard })
  } catch (error) {
    console.error(error)
    res.status(500).send({ status: 'FAILED', data: null, error })
  }
}

export { saveCommandToFile, registerCommand }
