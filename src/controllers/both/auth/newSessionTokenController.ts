import { Request, Response } from "express"
import { decode, verify } from "jsonwebtoken"
import { getRefreshToken } from "../../../helpers/dbHelpers"
import { createSessionToken } from "../../../helpers/jwtHelpers"
import { NewSessionTokenService } from "../../../services/both/auth/newSessionTokenService"

export class NewSessionTokenController {
  async handle(request: Request, response: Response) {
    const auth = request.headers.authorization
    if (!auth || auth === undefined || auth === null) {
      response.status(401).send({ Error: "Unauthorized Request" })
    }
    else {
      const [, token] = auth.split(" ")
      const decodedToken = decode(token)
      const uid = decodedToken['sub'].toString()
      const role = decodedToken['role'].toString()

      const newSessionTokenService = new NewSessionTokenService()
      const resp = await newSessionTokenService.execute(uid, role)

      response.status(resp['status']).send(resp['data'])
    }
  }
}