import { Request, Response, NextFunction } from "express"

export async function isEmployee(request: Request, response: Response, next: NextFunction) {
  const role = response.locals.role
  if (role === 'employee') {
    next()
  } else {
    response.status(401).send({ Error: "Unauthorized Request" })
  }
}