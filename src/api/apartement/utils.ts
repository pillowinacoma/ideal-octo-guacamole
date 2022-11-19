import { Response } from 'express'

export const handleError = (res: Response) => (reason: any) => {
  console.dir(reason)
  res.status(400).send(reason)
}
export const regExIsZipCode = /[0-9]{5}(?:-[0-9]{4})?/g
export const regExIsNumber = /^[0-9]+$/
export const regExIsFloat = /^-?\d+\.?\d*$/
