/**
 * @module validateRefreshToken
 */
import { Request, Response, NextFunction } from "express"
import { decode, verify } from "jsonwebtoken"
import { getRefreshToken } from "../helpers/dbHelpers"

/**
 * Validate refresh token middleware
 * 
 * @param request request received
 * @param response response objecet
 * @param next next function to execute
 */
export async function validateRefreshToken(request: Request, response: Response, next: NextFunction) {

  // header > Bearer token > split(" ") > ["Bearer", "token"] > "token"

  if (response.locals.uid === undefined) {
    const auth = request.headers.authorization
    if (!auth || auth === undefined || auth === null) {
      response.status(401).send({ Error: "Unauthorized Request" })
    }
    else {
      const [, token] = auth.split(" ")
      const decodedToken = decode(token)
      response.locals.uid = decodedToken['sub'].toString()
      response.locals.role = decodedToken['role'].toString()
    }
  }
  const uid = response.locals.uid
  const token = await getRefreshToken(uid)
  console.log(token)
  if (token === null || token === undefined) {
    response.status(401).send({ Error: "Unauthorized Request" })
  }
  else {
    try {
      // verify if token is from us and if is expired
      const verified = verify(token, process.env.JWT_REFRESH_TOKEN_KEY)
      if (!verified) {
        response.status(401).send({ Error: "Unauthorized Request" })
      }
      else {
        next()
      }
    } catch (e) {
      response.status(401).send({ Error: "Unauthorized Request" })
    }
  }

}