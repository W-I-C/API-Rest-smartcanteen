import { Request, Response } from "express";
import { RegisterService } from "../../../services/both/auth/registerService";

export class RegisterController {
  async handle(request: Request, response: Response) {

    let { roleid, preferredcampus, preferredbar, email, name, password, schoolno, birthdate, imgurl } = request.body
    try {
      if (roleid === undefined || preferredcampus === undefined ||
        preferredbar === undefined || email === undefined ||
        name === undefined || password === undefined ||
        schoolno === undefined || birthdate === undefined) {
        throw new Error("Missing Arguments!")
      }
      birthdate = new Date(birthdate)

      const registerService = new RegisterService()
      const resp = await registerService.execute({ roleid, preferredcampus, preferredbar, email, name, password, schoolno, birthdate, imgurl })
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message);
    }

  }
}
