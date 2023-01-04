import { Response, Request } from "express";
import { LogoutService } from "../../../services/both/auth/logoutService";

export class LogoutController {
  async handle(request: Request, response: Response) {
    const uid = response.locals.uid
    const token = request.headers.authorization.split(" ")[1]

    const logoutService = new LogoutService()
    const resp = await logoutService.execute(uid, token)

    response.status(200).json(resp.msg);

  }
}