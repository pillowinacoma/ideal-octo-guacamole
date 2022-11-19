import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { RHWithBody, RHWithParams } from '../../types'
import { omit } from 'lodash'
import {
  createApartementInputSchema,
  deleteApartementInputSchema,
  getApartementInputSchema,
  updateApartementInputSchema,
} from './schema'
import { handleError } from './utils'
import { RequestHandler } from 'express'

const prisma = new PrismaClient()

type createApartementBodyType = z.infer<typeof createApartementInputSchema>['body']
export const createApartement: RHWithBody<createApartementBodyType> = async (req, res) => {
  const apartement = await prisma.apartement
    .create({
      data: {
        ...omit(req.body),
      },
    })
    .catch(handleError(res))

  if (apartement) res.status(201).send({ apartement })
}

type deleteApartementParamsType = z.infer<typeof deleteApartementInputSchema>['params']
export const deleteApartement: RHWithParams<deleteApartementParamsType> = async (req, res) => {
  const { id } = req.params
  const apartement = await prisma.apartement
    .delete({
      where: {
        id: Number(id),
      },
    })
    .catch(handleError(res))
  if (apartement) res.status(201).send({ apartement })
}

type updateApartementParamsType = z.infer<typeof updateApartementInputSchema>['params']
type updateApartementBodyType = z.infer<typeof updateApartementInputSchema>['body']
export const updateApartement: RequestHandler<
  updateApartementParamsType,
  {},
  updateApartementBodyType
> = async (req, res) => {
  const { id } = req.params
  const { ...rest } = req.body
  const apartement = await prisma.apartement
    .update({
      where: {
        id: Number(id),
      },
      data: {
        ...rest,
      },
    })
    .catch(handleError(res))
  if (apartement) res.status(201).send({ apartement })
}

type getApartementParamsType = z.infer<typeof getApartementInputSchema>['params']
export const getApartement: RHWithParams<getApartementParamsType> = async (req, res) => {
  const { id } = req.params
  const apartement = await prisma.apartement
    .findUnique({
      where: {
        id: Number(id),
      },
    })
    .catch(handleError(res))
  if (apartement) res.status(201).send({ apartement })
}
export { createApartementInputSchema, deleteApartementInputSchema, updateApartementInputSchema }
