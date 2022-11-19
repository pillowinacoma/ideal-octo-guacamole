import { string, z } from 'zod'
import { regExIsFloat, regExIsNumber, regExIsZipCode } from '../utils'

const idSchema = string().regex(regExIsNumber)
const nameSchema = z.string().optional()
const streetSchema = z.string().optional()
const zipCodeSchema = z.string().regex(regExIsZipCode).optional()
const citySchema = z.string().optional()
const roomsSchema = z
  .object({
    number: z.number(),
    area: z.string().regex(regExIsFloat),
    price: z.number(),
  })
  .array()
  .nonempty()
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
      rooms: roomsSchema,
    })
    .strict(),
})
