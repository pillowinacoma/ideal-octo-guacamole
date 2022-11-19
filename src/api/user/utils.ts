import { Response } from 'express'

export const handleError = (res: Response) => (reason: any) => {
  console.dir(reason)
  res.status(401).send(reason)
}

export const isDateString = (date: string) => {
  //@ts-ignore
  return new Date(date) !== 'Invalid Date' && !isNaN(new Date(date))
}

export const isPhoneNumber = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gim
