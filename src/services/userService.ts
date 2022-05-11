import { Prisma, User } from '@prisma/client'
import prisma from '../../prisma/prisma-client'

async function getAllUsers() {
  const users = await prisma.user.findMany()
  return users
}

async function getOneUser(userId: string, includeWizards: boolean) {
  const query = {
    where: {
      id: userId
    }
  } as Prisma.UserFindUniqueArgs

  if (includeWizards) {
    Object.assign(query, {
      include: {
        Wizards: true
      }
    })
  }

  const user = await prisma.user.findUnique(query)
  return user
}

async function createNewUser(user: any) {
  const createdUser = await prisma.user.create({ data: user })
  return createdUser
}

async function updateOneUser(userId: string, user: User) {
  console.log(userId, user)
  const updatedUser = await prisma.user.update({
    where: {
      id: userId
    },
    data: user
  })
  console.log(updatedUser)
  return updatedUser
}

async function updateOneUserByUsername(username: string, user: User) {
  const updatedUser = await prisma.user.update({ where: { username }, data: user })
  return updatedUser
}

async function deleteOneUser(userId: string) {
  await prisma.user.delete({ where: { id: userId } }) 
}

export { getAllUsers, getOneUser, createNewUser, updateOneUser, updateOneUserByUsername, deleteOneUser }
