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

const prisma = new PrismaClient()

type createApartementInputType = z.infer<typeof createApartementInputSchema>['body']
export const createApartement: RHWithBody<createApartementInputType> = async (req, res) => {
  const apartement = await prisma.apartement
    .create({
      data: {
        ...omit(req.body),
      },
    })
    .catch(handleError(res))

  if (apartement) res.status(201).send({ apartement })
}

type deleteApartementInputType = z.infer<typeof deleteApartementInputSchema>['body']
export const deleteApartement: RHWithBody<deleteApartementInputType> = async (req, res) => {
  const apartement = await prisma.apartement
    .delete({
      where: {
        ...req.body,
      },
    })
    .catch(handleError(res))
  if (apartement) res.status(201).send({ apartement })
}

type updateApartementInputType = z.infer<typeof updateApartementInputSchema>['body']
export const updateApartement: RHWithBody<updateApartementInputType> = async (req, res) => {
  const { id, ...rest } = req.body
  const apartement = await prisma.apartement
    .update({
      where: {
        id,
      },
      data: {
        ...rest,
      },
    })
    .catch(handleError(res))
  if (apartement) res.status(201).send({ apartement })
}

type getApartementInputType = z.infer<typeof getApartementInputSchema>['params']
export const getApartement: RHWithParams<getApartementInputType> = async (req, res) => {
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
