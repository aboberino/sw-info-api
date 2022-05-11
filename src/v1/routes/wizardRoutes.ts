import express from 'express'
import { getOneWizard, createNewWizard, deleteOneWizard, getAllWizards, updateOneWizard } from '../../controllers/wizardController'
import { body, oneOf, check, param } from 'express-validator'

const router = express.Router()

router.get('/', getAllWizards)

router.get('/:wizardId', param('wizardId'), getOneWizard)

router.post('/', body('wizardId').notEmpty().isInt(), createNewWizard)

router.patch('/:wizardId', param('wizardId'), updateOneWizard)

router.delete('/:wizardId', param('wizardId'), deleteOneWizard)

export default router
