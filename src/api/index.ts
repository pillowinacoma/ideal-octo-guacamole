import express from 'express'
import { validate } from './schema-validation'
import {
  createUser,
  createUserInputSchema,
  deleteUser,
  deleteUserInputSchema,
  getUser,
  updateUser,
  updateUserInputSchema,
} from './user'
import {
  deleteApartement,
  deleteApartementInputSchema,
  createApartement,
  createApartementInputSchema,
  updateApartement,
  updateApartementInputSchema,
  getApartement,
} from './apartement'
import { getApartementInputSchema } from './apartement/schema'
import { getUserWithEmailSchema } from './user/schema/get-user'
import { createRoom, deleteRoom, getRoom, updateRoom } from './room'
import {
  createRoomInputSchema,
  deleteRoomInputSchema,
  getRoomInputSchema,
  updateRoomInputSchema,
} from './room/schema'

const router = express.Router()

router.get('/user/:email', validate(getUserWithEmailSchema), getUser)
router.post('/user', validate(createUserInputSchema), createUser)
router.put('/user', validate(updateUserInputSchema), updateUser)
router.delete('/user', validate(deleteUserInputSchema), deleteUser)
router.get('/apartement/:id', validate(getApartementInputSchema), getApartement)
router.post('/apartement', validate(createApartementInputSchema), createApartement)
router.put('/apartement', validate(updateApartementInputSchema), updateApartement)
router.delete('/apartement', validate(deleteApartementInputSchema), deleteApartement)
router.get('/room/:id', validate(getRoomInputSchema), getRoom)
router.post('/room/', validate(createRoomInputSchema), createRoom)
router.put('/room/:id', validate(updateRoomInputSchema), updateRoom)
router.delete('/room/:id', validate(deleteRoomInputSchema), deleteRoom)

export default router
