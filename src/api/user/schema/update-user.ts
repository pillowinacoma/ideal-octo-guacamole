import { z } from 'zod'
import { isDateString, isPhoneNumber } from '../utils'

export const updateUserInputSchema = z.object({
  params: z.object({
    email: z.string().email(),
  }),
  body: z
    .object({
      firstName: z.string({}).optional(),
      lastName: z.string({}).optional(),
      email: z.string({}).email().optional(),
      phone: z.string({}).regex(isPhoneNumber).optional(),
      birthDate: z.string({}).refine(isDateString, 'Not a valid birthDate').optional(),
      nationality: z.string({}).optional(),
    })
    .strict(),
})
