import { PrismaClient } from '@prisma/client'
import { RequestHandler } from 'express'
import { z } from 'zod'
import { RHWithParams } from '../../types'
import { createUserInputSchema, deleteUserInputSchema, updateUserInputSchema } from './schema'
import { getUserWithEmailSchema } from './schema/get-user'
import { handleError } from './utils'

const prisma = new PrismaClient()

type createUserInputType = z.infer<typeof createUserInputSchema>['body']
export const createUser: RequestHandler<{}, {}, createUserInputType> = async (req, res) => {
  const user = await prisma.user
    .create({
      data: {
        ...req.body,
        birthDate: new Date(req.body.birthDate),
      },
    })
    .catch(handleError(res))

  if (user) res.status(201).send({ user })
}

type updateUserInputType = z.infer<typeof updateUserInputSchema>['body']
export const updateUser: RequestHandler<{}, {}, updateUserInputType> = async (req, res) => {
  const { email, phone } = req.body
  if (!email || !phone) return

  const user = await prisma.user
    .update({
      where: { ...(email ? { email } : {}), ...(phone ? { phone } : {}) },
      data: { ...req.body },
    })
    .catch(handleError(res))
  if (user) res.status(201).send({ user })
  else res.status(404).send()
}

type deleteUserInputType = z.infer<typeof deleteUserInputSchema>['body']
export const deleteUser: RequestHandler<{}, {}, deleteUserInputType> = async (req, res) => {
  const { email } = req.body

  const user = await prisma.user
    .delete({
      where: { email },
    })
    .catch(handleError(res))
  if (user) res.status(201).send({ user })
}

type getUserInputType = z.infer<typeof getUserWithEmailSchema>['params']

export const getUser: RHWithParams<getUserInputType> = async (req, res) => {
  const { email } = req.params

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (user) res.status(200).send({ user })
  else res.status(404).send()
}
export { createUserInputSchema, updateUserInputSchema, deleteUserInputSchema }
