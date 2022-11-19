import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { RHWithBody, RHWithParams } from '../../types'
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
  const { rooms, ...rest } = req.body
  const apartement = await prisma.apartement
    .create({
      data: {
        ...rest,
        Room: {
          create: rooms.map((e) => ({ ...e, area: parseFloat(e.area) })),
        },
      },
      include: { Room: {} },
    })
    .catch(handleError(res))

  if (apartement) res.status(201).send({ apartement })
  else res.status(404).send()
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
  if (apartement) res.status(200).send({ apartement })
  else res.status(404).send()
}

type updateApartementParamsType = z.infer<typeof updateApartementInputSchema>['params']
type updateApartementBodyType = z.infer<typeof updateApartementInputSchema>['body']
export const updateApartement: RequestHandler<
  updateApartementParamsType,
  {},
  updateApartementBodyType
> = async (req, res) => {
  const { id } = req.params
  const { rooms, ...rest } = req.body
  const apartement = await prisma.apartement
    .update({
      where: {
        id: Number(id),
      },
      data: {
        ...rest,
        Room: {
          create: rooms?.map((e) => ({ ...e, area: parseFloat(e.area) })) ?? [],
        },
      },
      include: { Room: {} },
    })
    .catch(handleError(res))
  if (apartement) res.status(200).send({ apartement })
  else res.status(404).send()
}

type getApartementParamsType = z.infer<typeof getApartementInputSchema>['params']
export const getApartement: RHWithParams<getApartementParamsType> = async (req, res) => {
  const { id } = req.params
  const apartement = await prisma.apartement
    .findUnique({
      where: {
        id: Number(id),
      },
      include: { Room: {} },
    })
    .catch(handleError(res))
  if (apartement) res.status(200).send({ apartement })
  else res.status(404).send()
}
export { createApartementInputSchema, deleteApartementInputSchema, updateApartementInputSchema }
