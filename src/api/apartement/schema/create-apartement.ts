import { z } from 'zod'
import { regExIsFloat } from '../utils'
import { regExIsZipCode } from '../utils'

const nameSchema = z.string()
const streetSchema = z.string()
const zipCodeSchema = z.string().regex(regExIsZipCode)
const citySchema = z.string()
const roomsSchema = z
  .object({
    number: z.number(),
    area: z.string().regex(regExIsFloat),
    price: z.number(),
  })
  .array()
  .nonempty()

export const createApartementInputSchema = z.object({
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
