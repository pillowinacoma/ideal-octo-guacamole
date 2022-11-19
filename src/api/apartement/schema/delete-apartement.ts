import { z } from 'zod'

const idSchema = z.number({
  required_error: 'a valid appartenet id is required',
})

export const deleteApartementInputSchema = z.object({
  body: z
    .object({
      id: idSchema,
    })
    .strict(),
})
