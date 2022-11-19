import { string, z } from 'zod'
import { regExIsNumber, regExIsZipCode } from '../utils'

const idSchema = string().regex(regExIsNumber)
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
  .regex(regExIsZipCode)
  .optional()
const citySchema = z
  .string({
    required_error: 'city is required',
  })
  .optional()

export const updateApartementInputSchema = z.object({
  params: z.object({
    id: idSchema,
  }),
  body: z
    .object({
      name: nameSchema,
      street: streetSchema,
      zipCode: zipCodeSchema,
      city: citySchema,
    })
    .strict(),
})
