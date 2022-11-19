import express from 'express'
import { validate } from './schema-validation'
import { createUser, deleteUser, getUser, updateUser } from './user'
import {
  createUserInputSchema,
  updateUserInputSchema,
  deleteUserInputSchema,
  getUserInputSchema,
} from './user/schema'
import { deleteApartement, createApartement, updateApartement, getApartement } from './apartement'
import {
  createApartementInputSchema,
  deleteApartementInputSchema,
  getApartementInputSchema,
  updateApartementInputSchema,
} from './apartement/schema'
import {
  createRoom,
  deleteReservation,
  deleteRoom,
  getRoom,
  makeReservation,
  updateRoom,
} from './room'
import {
  createRoomInputSchema,
  deleteReservationInputSchema,
  deleteRoomInputSchema,
  getRoomInputSchema,
  makeReservationInputSchema,
  updateRoomInputSchema,
} from './room/schema'

const router = express.Router()

router.get('/user/:email', validate(getUserInputSchema), getUser)
router.post('/user', validate(createUserInputSchema), createUser)
router.put('/user/:email', validate(updateUserInputSchema), updateUser)
router.delete('/user/:email', validate(deleteUserInputSchema), deleteUser)
router.get('/apartement/:id', validate(getApartementInputSchema), getApartement)
router.post('/apartement', validate(createApartementInputSchema), createApartement)
router.put('/apartement/:id', validate(updateApartementInputSchema), updateApartement)
router.delete('/apartement/:id', validate(deleteApartementInputSchema), deleteApartement)
router.get('/room/:id', validate(getRoomInputSchema), getRoom)
router.post('/room', validate(createRoomInputSchema), createRoom)
router.put('/room/:id', validate(updateRoomInputSchema), updateRoom)
router.delete('/room/:id', validate(deleteRoomInputSchema), deleteRoom)
router.post('/room/:id/reservation', validate(makeReservationInputSchema), makeReservation)
router.delete('/room/:id/reservation', validate(deleteReservationInputSchema), deleteReservation)

export default router
