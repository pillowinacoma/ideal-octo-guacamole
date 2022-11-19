import { z } from 'zod'
export const deleteUserInputSchema = z.object({
  body: z
    .object({
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
    })
    .strict(),
})
