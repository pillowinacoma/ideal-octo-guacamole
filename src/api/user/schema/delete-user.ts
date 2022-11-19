import { z } from 'zod'
export const deleteUserInputSchema = z.object({
  params: z
    .object({
      email: z.string().email(),
    })
    .strict(),
})
