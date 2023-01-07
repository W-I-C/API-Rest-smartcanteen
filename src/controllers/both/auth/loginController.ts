/**
 * @module loginController
 */
import { Request, Response } from "express";
import { LoginService } from "../../../services/both/auth/loginService";

/**
 * Class responsible for receiving and calling the service methods that allows to login
 */
export class LoginController {
  /**
   * Allows to login, redirecting afterwards to the associated service
   *
   * {@link loginService}
   * @param request request receive.
   * @param response response.
   */
  async handle(request: Request, response: Response) {
    let { email, password } = request.body
    try {
      const loginService = new LoginService()
      const resp = await loginService.execute(email, password)
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(401).json(e.message);
    }


  }
}
