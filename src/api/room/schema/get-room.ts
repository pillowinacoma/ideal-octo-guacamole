
import { z } from 'zod'

const idSchema = z
  .string({
    required_error: 'a valid appartenet id is required',
  })
  .regex(/^[0-9]$/)

export const getRoomInputSchema = z.object({
  params: z
    .object({
      id: idSchema,
    })
    .strict(),
})
