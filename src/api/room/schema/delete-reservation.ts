import { z } from 'zod'
import { regExIsNumber } from '../utils'

export const deleteReservationInputSchema = z.object({
  params: z.object({
    id: z.string().regex(regExIsNumber),
  }),
})
