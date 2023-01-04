import { Request, Response, NextFunction } from "express"

export async function isConsumer(request: Request, response: Response, next: NextFunction) {
  const role = response.locals.role
  if (role === 'consumer') {
    next()
  } else {
    response.status(401).send({ Error: "Unauthorized Request" })
  }
}