import { Request, Response } from 'express'
import * as userService from '../services/userService'

function getAllUsers(req: Request, res: Response) {
  const users = userService.getAllUsers()
  res.send('Get all users')
}

function getOneUser(req: Request, res: Response) {
  const {
    params: { userId }
  } = req

  if (!userId) return

  const user = userService.getOneUser()
  res.send({ status: 'OK', data: user })
}

function createNewUser(req: Request, res: Response) {
  const { body } = req

  if (!body.name || !body.wizardId) {
    res.status(400).send({
      status: 'FAILED',
      error: 'Missing required fields'
    })
  }

  const newUser = {
    name: body.name,
    wizardId: body.wizardId
  }

  const createdUser = userService.createNewUser()
  res.status(201).send({ status: 'OK', data: createdUser })
}

function updateOneUser(req: Request, res: Response) {
  const {
    body,
    params: { userId }
  } = req
  if (!userId) return

  const updatedUser = userService.updateOneUser()
  res.send({ status: 'OK', data: updatedUser })
}

function deleteOneUser(req: Request, res: Response) {
  const {
    params: { userId }
  } = req
  if (!userId) return

  userService.deleteOneUser()
  res.status(204).send({ status: 'OK' })
}

export { getAllUsers, getOneUser, createNewUser, updateOneUser, deleteOneUser }
