import { Response, Request } from "express";
import { LogoutService } from "../../../services/both/auth/logoutService";

export class LogoutController {
  async handle(request: Request, response: Response) {
    const uid = response.locals.uid

    const logoutService = new LogoutService()
    const resp = await logoutService.execute(uid)

    response.status(200).json({ msg: "logout successful" });

  }
}