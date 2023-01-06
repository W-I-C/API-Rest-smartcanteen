/**
 * @module newSessionTokenController
 */
import { Request, Response } from "express"
import { decode } from "jsonwebtoken"
import { NewSessionTokenService } from "../../../services/both/auth/newSessionTokenService"

/**
 * Class responsible for receiving and calling the service methods that allows to get a new session token
 */
export class NewSessionTokenController {
  /**
 * Allows to get a new session token, redirecting afterwards to the associated service
 *
 * {@link newSessionTokenService}
 * @param request request receive.
 * @param response response.
 */
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