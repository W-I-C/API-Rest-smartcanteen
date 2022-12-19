import { Request, Response, NextFunction } from "express"
import { verify, decode } from "jsonwebtoken"
import { getRefreshToken } from "../helpers/dbHelpers"
export async function validateRefreshToken(request: Request, response: Response, next: NextFunction) {

  // header > Bearer token > split(" ") > ["Bearer", "token"] > "token"
  const uid = response.locals.uid
  console.log(uid)
  const token = await getRefreshToken(uid)
  console.log(token)
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