import express from "express"
import { validate } from "./schema-validation"
import {
  createUser,
  createUserInputSchema,
  deleteUser,
  deleteUserInputSchema,
  updateUser,
  updateUserInputSchema,
} from "./user"

const router = express.Router()

router.post("/user", validate(createUserInputSchema), createUser)
router.put("/user", validate(updateUserInputSchema), updateUser)
router.delete("/user", validate(deleteUserInputSchema), deleteUser)

export default router
