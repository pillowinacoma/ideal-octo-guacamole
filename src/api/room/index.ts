import { PrismaClient } from '@prisma/client'
import { RequestHandler } from 'express'
import { z } from 'zod'
import { RHWithBody, RHWithParams } from '../../types'
import { deleteRoomInputSchema, updateRoomInputSchema } from './schema'
import { createRoomInputSchema } from './schema/create-room'
import { getRoomInputSchema } from './schema/get-room'
import { handleError } from './utils'

const prisma = new PrismaClient()

type getRoomInputType = z.infer<typeof getRoomInputSchema>['params']
export const getRoom: RHWithParams<getRoomInputType> = async (req, res) => {
  const { id } = req.params
  const room = await prisma.apartement
    .findUnique({
      where: {
        id: Number(id),
      },
    })
    .catch(handleError(res))
  if (room) res.status(200).send({ room })
  else res.status(404).send()
}

type createRoomInputType = z.infer<typeof createRoomInputSchema>['body']
export const createRoom: RHWithBody<createRoomInputType> = async (req, res) => {
  const { area, ...rest } = req.body
  const room = await prisma.room
    .create({
      data: {
        ...rest,
        area: parseFloat(area),
      },
    })
    .catch(handleError(res))
  if (room) res.status(201).send({ room })
  else res.status(500).send()
}

type updateRoomBodyType = z.infer<typeof updateRoomInputSchema>['body']
type updateRoomParamsType = z.infer<typeof updateRoomInputSchema>['params']
export const updateRoom: RequestHandler<updateRoomParamsType, {}, updateRoomBodyType> = async (
  req,
  res
) => {
  const { id } = req.params
  const { area, ...rest } = req.body
  const room = await prisma.room
    .update({
      where: {
        id: Number(id),
      },
      data: {
        ...rest,
        ...(area ? { area: parseFloat(area) } : {}),
      },
    })
    .catch(handleError(res))
  if (room) res.status(201).send({ room })
  else res.status(500).send()
}

type deleteRoomParamsType = z.infer<typeof deleteRoomInputSchema>['params']
export const deleteRoom: RHWithParams<deleteRoomParamsType> = async (req, res) => {
  const { id } = req.params
  const room = await prisma.room
    .delete({
      where: {
        id: Number(id),
      },
    })
    .catch(handleError(res))
  if (room) res.status(201).send({ room })
  else res.status(500).send()
}
