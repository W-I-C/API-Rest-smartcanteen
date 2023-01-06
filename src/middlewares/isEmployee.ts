/**
 * @module isConsumer
 */
import { Request, Response, NextFunction } from "express"

/**
 * Employee role verification middleware
 * 
 * @param request request received
 * @param response response objecet
 * @param next next function to execute
 */
export async function isEmployee(request: Request, response: Response, next: NextFunction) {
  const role = response.locals.role
  if (role === 'employee') {
    next()
  } else {
    response.status(401).send({ Error: "Unauthorized Request" })
  }
}