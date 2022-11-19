import { PrismaClient } from '@prisma/client'
import { RequestHandler } from 'express'
import { z } from 'zod'
import { RHWithBody, RHWithParams } from '../../types'
import { createUserInputSchema, deleteUserInputSchema, updateUserInputSchema } from './schema'
import { getUserWithEmailSchema } from './schema/get-user'
import { handleError } from './utils'

const prisma = new PrismaClient()

type createUserBodyType = z.infer<typeof createUserInputSchema>['body']
export const createUser: RHWithBody<createUserBodyType> = async (req, res) => {
  const user = await prisma.user
    .create({
      data: {
        ...req.body,
        birthDate: new Date(req.body.birthDate),
      },
    })
    .catch(handleError(res))

  if (user) res.status(201).send({ user })
  else res.status(500).send()
}

type updateUserParamsType = z.infer<typeof updateUserInputSchema>['params']
type updateUserBodyType = z.infer<typeof updateUserInputSchema>['body']
export const updateUser: RequestHandler<updateUserParamsType, {}, updateUserBodyType> = async (
  req,
  res
) => {
  const { email } = req.params
  const user = await prisma.user
    .update({
      where: { email },
      data: { ...req.body },
    })
    .catch(handleError(res))
  if (user) res.status(201).send({ user })
  else res.status(404).send()
}

type deleteUserParamsType = z.infer<typeof deleteUserInputSchema>['params']
export const deleteUser: RHWithParams<deleteUserParamsType> = async (req, res) => {
  const { email } = req.params

  const user = await prisma.user
    .delete({
      where: { email },
    })
    .catch(handleError(res))
  if (user) res.status(201).send({ user })
  else res.status(404).send()
}

type getUserParamsType = z.infer<typeof getUserWithEmailSchema>['params']

export const getUser: RHWithParams<getUserParamsType> = async (req, res) => {
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
