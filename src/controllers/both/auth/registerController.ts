/**
 * @module registerController
 */
import { Request, Response } from "express";
import { RegisterService } from "../../../services/both/auth/registerService";

/**
 * Class responsible for receiving and calling the service methods that allows to register a user
 */
export class RegisterController {
  /**
 * Allows to register a user, redirecting afterwards to the associated service
 *
 * {@link registerService}
 * @param request request receive.
 * @param response response.
 */
  async handle(request: Request, response: Response) {

    let { roleid, preferredcampus, preferredbar, email, name, password, schoolno, birthdate } = request.body
    try {
      if (roleid === undefined || preferredcampus === undefined ||
        preferredbar === undefined || email === undefined ||
        name === undefined || password === undefined ||
        schoolno === undefined || birthdate === undefined) {
        throw new Error("Missing Arguments!")
      }
      birthdate = new Date(birthdate)

      const registerService = new RegisterService()
      const resp = await registerService.execute({ roleid, preferredcampus, preferredbar, email, name, password, schoolno, birthdate })
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message);
    }

  }
}
