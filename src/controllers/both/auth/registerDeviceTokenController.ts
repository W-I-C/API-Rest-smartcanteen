/**
 * @module registerDeviceTokenController
 */
import { Request, Response } from "express"
import { decode } from "jsonwebtoken"
import { NewSessionTokenService } from "../../../services/both/auth/newSessionTokenService"
import { RegisterDeviceTokenService } from "../../../services/both/auth/registerDeviceService"

/**
 * Class responsible for receiving and calling the service methods that allows to register a new device in api
 */
export class RegisterDeviceTokenController {
  /**
 * Allows to get a new session token, redirecting afterwards to the associated service
 *
 * {@link registerDeviceTokenService}
 * @param request request receive.
 * @param response response.
 */
  async handle(request: Request, response: Response) {

    const uid = response.locals.uid
    const { token } = request.body
    if (uid === undefined || token === null) {
      response.status(401).send({ Error: "Unauthorized Request" })
    }
    else {
      try {
        const newSessionTokenService = new RegisterDeviceTokenService()
        const resp = await newSessionTokenService.execute(uid, token)
        response.status(200).send('Device registered')

      } catch (e) {
        response.status(500).send(e.message)
      }



    }
  }
}