import { z } from 'zod'

export const getUserInputSchema = z.object({
  params: z
    .object({
      email: z.string().email(),
    })
    .strict(),
})
