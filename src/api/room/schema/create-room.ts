import { z } from 'zod'
import { regExIsFloat } from '../utils'

export const createRoomInputSchema = z.object({
  body: z
    .object({
      number: z.number(),
      area: z.string().regex(regExIsFloat),
      price: z.number(),
      apartementId: z.number(),
    })
    .strict(),
})
