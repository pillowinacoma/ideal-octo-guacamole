import { Response } from "express"

export const handleError = (res: Response) => (reason: any) => {
  console.dir(reason)
  res.status(401).send(reason)
}
