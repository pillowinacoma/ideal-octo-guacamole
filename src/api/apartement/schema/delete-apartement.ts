import { z } from 'zod'
import { regExIsNumber } from '../utils'

const idSchema = z.string().regex(regExIsNumber)

export const deleteApartementInputSchema = z.object({
  params: z
    .object({
      id: idSchema,
    })
    .strict(),
})
