/**
 * @module validateToken
 */
import { Request, Response, NextFunction } from "express"
import { verify, decode } from "jsonwebtoken"


/**
 * Validate session token middleware
 * 
 * @param request request received
 * @param response response objecet
 * @param next next function to execute
 */
export async function validateToken(request: Request, response: Response, next: NextFunction) {
  const auth = request.headers.authorization
  if (!auth || auth === undefined || auth === null) {
    response.status(401).send({ Error: "Unauthorized Request" })
  }
  else {
    // header > Bearer token > split(" ") > ["Bearer", "token"] > "token"
    const [, token] = auth.split(" ")
    try {
      // verify if token is from us and if is expired
      const verified = verify(token, process.env.JWT_SECRET_KEY)
      if (!verified)
        response.status(401).send({ Error: "Unauthorized Request" })
      else {
        const decodedToken = decode(token)
        response.locals.uid = decodedToken['sub'].toString()
        response.locals.role = decodedToken['role'].toString()
        next()
      }
    } catch (e) {
      response.status(401).send({ Error: "Unauthorized Request" })
    }
  }


}




