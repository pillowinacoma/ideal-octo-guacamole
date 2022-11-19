import { PrismaClient } from '@prisma/client'
import { RequestHandler } from 'express'
import { z } from 'zod'
import { RHWithBody, RHWithParams } from '../../types'
import {
  deleteReservationInputSchema,
  deleteRoomInputSchema,
  makeReservationInputSchema,
  updateRoomInputSchema,
} from './schema'
import { createRoomInputSchema } from './schema/create-room'
import { getRoomInputSchema } from './schema/get-room'
import { handleError } from './utils'

const prisma = new PrismaClient()

type getRoomInputType = z.infer<typeof getRoomInputSchema>['params']
export const getRoom: RHWithParams<getRoomInputType> = async (req, res) => {
  const { id } = req.params
  const room = await prisma.room
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

  const room = await prisma.room.findUnique({
    where: { id: Number(id) },
    include: {
      apartement: {
        include: { _count: { select: { Room: true } } },
      },
    },
  })
  if (!room) {
    res.status(404).send()
    return
  }

  const { apartement } = room
  if (!apartement) {
    res.status(500).send('Room has no apartement')
    return
  }
  if (apartement._count.Room < 2 && rest.apartementId) {
    res.status(400).send("You can't move only room in the apartement")
    return
  }

  const updatedRoom = await prisma.room
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
  if (updatedRoom) res.status(201).send({ room: updatedRoom })
  else res.status(500).send()
}

type deleteRoomParamsType = z.infer<typeof deleteRoomInputSchema>['params']
export const deleteRoom: RHWithParams<deleteRoomParamsType> = async (req, res) => {
  const { id } = req.params

  const room = await prisma.room.findUnique({
    where: { id: Number(id) },
    include: {
      apartement: {
        include: {
          _count: { select: { Room: true } },
        },
      },
    },
  })
  if (!room) {
    res.status(404).send()
    return
  }

  const { apartement } = room
  if (!apartement) {
    res.status(500).send('Room has no apartement')
    return
  }
  if (apartement._count.Room < 2) {
    res.status(400).send("You can't delete only room in the apartement")
    return
  }

  const deletedRoom = await prisma.room
    .delete({
      where: {
        id: Number(id),
      },
    })
    .catch(handleError(res))
  if (deletedRoom) res.status(201).send({ room: deletedRoom })
  else res.status(500).send()
}

type makeReservationParamsType = z.infer<typeof makeReservationInputSchema>['params']
type makeReservationBodyType = z.infer<typeof makeReservationInputSchema>['body']
export const makeReservation: RequestHandler<
  makeReservationParamsType,
  {},
  makeReservationBodyType
> = async (req, res) => {
  const { id } = req.params
  const { email } = req.body

  const reservation = await prisma.reservation
    .create({
      data: {
        userEmail: email,
        roomId: Number(id),
      },
      include: {
        room: true,
        user: true,
      },
    })
    .catch(handleError(res))

  if (reservation) res.status(201).send({ reservation })
  else res.status(400).send()
}

type deleteReservationParamsType = z.infer<typeof deleteReservationInputSchema>['params']
export const deleteReservation: RequestHandler<deleteReservationParamsType, {}, {}> = async (
  req,
  res
) => {
  const { id } = req.params

  const reservation = await prisma.reservation
    .delete({
      where: {
        roomId: Number(id),
      },
      include: {
        room: true,
        user: true,
      },
    })
    .catch(handleError(res))
  if (reservation) res.status(201).send({ reservation })
  else res.status(500).send()
}
