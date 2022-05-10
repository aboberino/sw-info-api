import express from 'express'
import { getOneUser, createNewUser, deleteOneUser, getAllUsers, updateOneUser } from '../../controllers/userController'

const router = express.Router()

router.get('/', getAllUsers)

router.get('/:userId', getOneUser)

router.post('/', createNewUser)

router.patch('/:userId', updateOneUser)

router.delete('/:userId', deleteOneUser)

export default router
