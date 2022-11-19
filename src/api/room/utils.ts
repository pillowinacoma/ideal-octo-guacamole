import { Response } from 'express'

export const handleError = (res: Response) => (reason: any) => {
  console.dir(reason)
  res.status(401).send(reason)
}

export const regExIsNumber = /^[0-9]+$/
export const regExIsFloat = /^-?\d+\.?\d*$/
