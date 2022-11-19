import { z } from 'zod'
import { isZipCode } from '../utils'

const idSchema = z.number({
  required_error: 'a valid appartenet id is required',
})

const nameSchema = z
  .string({
    required_error: 'name is required',
  })
  .optional()
const streetSchema = z
  .string({
    required_error: 'street is required',
  })
  .optional()
const zipCodeSchema = z
  .string({
    required_error: 'zipCode is required',
  })
  .regex(isZipCode)
  .optional()
const citySchema = z
  .string({
    required_error: 'city is required',
  })
  .optional()

export const updateApartementInputSchema = z.object({
  body: z
    .object({
      id: idSchema,
      name: nameSchema,
      street: streetSchema,
      zipCode: zipCodeSchema,
      city: citySchema,
    })
    .strict(),
})
