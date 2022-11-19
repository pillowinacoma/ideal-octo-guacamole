import { z } from 'zod'
import { regExIsNumber } from '../utils'

export const makeReservationInputSchema = z.object({
  body: z.object({
    email: z.string().email(),
  }),
  params: z.object({
    id: z.string().regex(regExIsNumber),
  }),
})
