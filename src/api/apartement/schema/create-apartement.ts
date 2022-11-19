import { z } from 'zod'
import { isZipCode } from '../utils'

const nameSchema = z.string({
  required_error: 'name is required',
})
const streetSchema = z.string({
  required_error: 'street is required',
})
const zipCodeSchema = z
  .string({
    required_error: 'zipCode is required',
  })
  .regex(isZipCode)
const citySchema = z.string({
  required_error: 'city is required',
})
export const createApartementInputSchema = z.object({
  body: z
    .object({
      name: nameSchema,
      street: streetSchema,
      zipCode: zipCodeSchema,
      city: citySchema,
    })
    .strict(),
})
