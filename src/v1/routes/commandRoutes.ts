import express from 'express'
import { body, param } from 'express-validator'
import { saveCommandToFile, registerCommand } from '../../controllers/commandController'

const router = express.Router()

router.post('/', saveCommandToFile)

router.post('/:commandName/:wizardId', param('commandName'), param('wizardId'), body('req'), body('resp'), registerCommand)

export default router
