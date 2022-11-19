import { z } from 'zod'
import { regExIsFloat, regExIsNumber } from '../utils'

export const updateRoomInputSchema = z.object({
  params: z.object({
    id: z.string().regex(regExIsNumber),
  }),
  body: z.object({
    number: z.number().optional(),
    area: z.string().regex(regExIsFloat).optional(),
    price: z.number().optional(),
    apartementId: z.number().optional(),
  }),
})
