import express from 'express'
import { getOneUser, createNewUser, deleteOneUser, getAllUsers, updateOneUser } from '../../controllers/userController'
import { body, oneOf, check, param } from 'express-validator'

const router = express.Router()

router.get('/', getAllUsers)

router.get('/:userId', param('userId'), getOneUser)

router.post('/', body('email').isEmail(), body('password').isLength({ min: 8 }), createNewUser)

router.patch(
  '/:userId',
  param('userId'),
  body('username').isLength({ min: 2 }).optional(),
  body('email').isEmail().optional(),
  body('password').isLength({ min: 8 }).optional(),
  updateOneUser
)

router.delete('/:userId', param('userId'), deleteOneUser)

export default router
