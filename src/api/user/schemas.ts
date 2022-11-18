import { z } from "zod"

export const createUserInputSchema = z.object({
  body: z.object({
    firstName: z.string({
      required_error: "firstName is required",
    }),
    lastName: z.string({
      required_error: "lastName is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email(),
    phone: z
      .string({
        required_error: "phone is required",
      })
      .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gim),
    birthDate: z
      .string({
        required_error: "birthDate is required",
      })
      .refine((date) => {
        //@ts-ignore
        return new Date(date) !== "Invalid Date" && !isNaN(new Date(date))
      }, "not a valid date"),
    nationality: z.string({
      required_error: "nationality is required",
    }),
  }),
})

export const updateUserInputSchema = z.object({
  body: z.object({
    firstName: z.string({}).optional(),
    lastName: z.string({}).optional(),
    email: z.string({}).email().optional(),
    phone: z
      .string({})
      .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gim)
      .optional(),
    birthDate: z
      .string({})
      .refine((date) => {
        //@ts-ignore
        return new Date(date) !== "Invalid Date" && !isNaN(new Date(date))
      }, "not a valid date")
      .optional(),
    nationality: z.string({}).optional(),
  }),
})

export const deleteUserInputSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email(),
  }),
})
