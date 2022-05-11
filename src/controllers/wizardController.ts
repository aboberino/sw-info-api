import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import * as wizardService from '../services/wizardService'

async function getAllWizards(req: Request, res: Response) {
  try {
    const wizards = await wizardService.getAllWizards()
    res.json({ status: 'OK', data: wizards })
  } catch (error) {
    console.log(error)
    res.status(201).json({ status: 'FAILED', error })
  }
}

async function getOneWizard(req: Request, res: Response) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'FAILED', errors: errors.array() })
  }

  const {
    params: { wizardId }
  } = req

  try {
    const wizard = await wizardService.getOneWizard(parseInt(wizardId), true)
    res.status(200).json({ status: 'OK', data: wizard })
  } catch (error) {
    console.log(error)
    res.status(201).json({ status: 'FAILED', error })
  }
}

async function createNewWizard(req: Request, res: Response) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'FAILED', errors: errors.array() })
  }

  const { body } = req

  console.log(body)

  try {
    const createdWizard = await wizardService.createNewWizard(body)
    res.status(201).json({ status: 'OK', data: createdWizard })
  } catch (error) {
    console.log(error)
    res.status(201).json({ status: 'FAILED', error })
  }
}

async function updateOneWizard(req: Request, res: Response) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'FAILED', errors: errors.array() })
  }

  const {
    body,
    params: { wizardId }
  } = req

  try {
    const updatedWizard = await wizardService.updateOneWizard(parseInt(wizardId), body)
    res.json({ status: 'OK', data: updatedWizard })
  } catch (error) {
    console.log(error)
    res.status(201).json({ status: 'FAILED', error })
  }
}

async function deleteOneWizard(req: Request, res: Response) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'FAILED', errors: errors.array() })
  }

  const {
    params: { wizardId }
  } = req
  try {
    wizardService.deleteOneWizard(parseInt(wizardId))
    res.status(204).json({ status: 'OK' })
  } catch (error) {
    console.log(error)
    res.status(201).json({ status: 'FAILED', error })
  }
}

export { getAllWizards, getOneWizard, createNewWizard, updateOneWizard, deleteOneWizard }
