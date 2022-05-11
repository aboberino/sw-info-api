import { Prisma, Wizard } from '@prisma/client'
import prisma from '../../prisma/prisma-client'

async function getAllWizards() {
  const wizards = await prisma.wizard.findMany()
  return wizards
}

async function getOneWizard(wizardId: number, includeUsers: boolean) {
  const query = {
    where: {
      wizardId: wizardId
    }
  } as Prisma.WizardFindUniqueArgs

  if (includeUsers) {
    Object.assign(query, {
      include: {
        User: true
      }
    })
  }

  const wizard = await prisma.wizard.findUnique(query)
  return wizard
}

async function createNewWizard(wizard: any) {
  const createdWizard = await prisma.wizard.create({
    data: wizard
  })
  return createdWizard
}

async function updateOneWizard(wizardId: number, wizard: Wizard) {
  const updatedWizard = await prisma.wizard.update({
    where: {
      wizardId
    },
    data: wizard
  })
  return updatedWizard
}

async function deleteOneWizard(wizardId: number) {
  await prisma.wizard.delete({ where: { wizardId } })
}

export { getAllWizards, getOneWizard, createNewWizard, updateOneWizard, deleteOneWizard }
