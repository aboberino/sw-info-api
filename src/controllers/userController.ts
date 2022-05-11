import { Request, Response } from 'express'
import * as userService from '../services/userService'
import { validationResult } from 'express-validator'

async function getAllUsers(req: Request, res: Response) {
  const users = await userService.getAllUsers()
  res.json({ status: 'OK', data: users })
}

async function getOneUser(req: Request, res: Response) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'FAILED', errors: errors.array() })
  }

  const {
    params: { userId }
  } = req

  try {
    const user = await userService.getOneUser(userId, true)
    res.status(200).json({ status: 'OK', data: user })
  } catch (error) {
    console.log(error)
    res.status(400).json({ status: 'FAILED', error })
  }
}

async function createNewUser(req: Request, res: Response) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'FAILED', errors: errors.array() })
  }

  const { body } = req

  console.log(body)

  try {
    const createdUser = await userService.createNewUser(body)
    res.status(201).json({ status: 'OK', data: createdUser })
  } catch (error) {
    console.log(error)
    res.status(400).json({ status: 'FAILED', error })
  }
}

async function updateOneUser(req: Request, res: Response) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'FAILED', errors: errors.array() })
  }

  const {
    body,
    params: { userId }
  } = req
  console.log(userId)

  try {
    const updatedUser = await userService.updateOneUser(userId, body)
    res.json({ status: 'OK', data: updatedUser })
  } catch (error) {
    console.log(error)
    res.status(400).json({ status: 'FAILED', error })
  }
}

async function deleteOneUser(req: Request, res: Response) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'FAILED', errors: errors.array() })
  }
  
  const {
    params: { userId }
  } = req

  try {
    await userService.deleteOneUser(userId)
    res.status(204).json({ status: 'OK' })
  } catch (error) {
    console.log(error)
    res.status(400).json({ status: 'FAILED', error })
  }
}

export { getAllUsers, getOneUser, createNewUser, updateOneUser, deleteOneUser }
