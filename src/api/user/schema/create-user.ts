import { z } from 'zod'
import { isDateString, isPhoneNumber } from '../utils'

export const createUserInputSchema = z.object({
  body: z
    .object({
      firstName: z.string({
        required_error: 'firstName is required',
      }),
      lastName: z.string({
        required_error: 'lastName is required',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      phone: z
        .string({
          required_error: 'phone is required',
        })
        .regex(isPhoneNumber),
      birthDate: z.string({}).refine(isDateString, 'Not a valid birthDate'),
      nationality: z.string({
        required_error: 'nationality is required',
      }),
    })
    .strict(),
})
