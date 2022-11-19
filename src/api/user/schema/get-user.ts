import { z } from 'zod'

export const getUserWithEmailSchema = z.object({
  params: z
    .object({
      email: z.string().email(),
    })
    .strict(),
})
