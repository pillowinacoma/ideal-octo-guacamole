import { z } from 'zod'
import { regExIsNumber } from '../utils'

export const deleteRoomInputSchema = z.object({
  params: z.object({
    id: z.string().regex(regExIsNumber),
  }),
})
