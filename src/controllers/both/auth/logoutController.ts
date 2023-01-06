/**
 * @module logoutController
 */
import { Response, Request } from "express";
import { LogoutService } from "../../../services/both/auth/logoutService";

/**
 * Class responsible for receiving and calling the service methods that allows to logout
 */
export class LogoutController {
  /**
 * Allows to logout, redirecting afterwards to the associated service
 *
 * {@link logoutService}
 * @param request request receive.
 * @param response response.
 */
  async handle(request: Request, response: Response) {
    const uid = response.locals.uid
    const token = request.headers.authorization.split(" ")[1]

    const logoutService = new LogoutService()
    const resp = await logoutService.execute(uid, token)

    response.status(200).json(resp.msg);

  }
}