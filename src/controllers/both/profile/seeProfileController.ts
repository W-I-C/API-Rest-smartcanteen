import { Request, Response } from "express";
import { SeeProfileService } from "../../../services/both/profile/seeProfileService";

export class SeeProfileController {
  async handle(request: Request, response: Response) {
    const uId = response.locals.uid;

    try {
      if (uId === undefined) {
        throw new Error("Invalid request");
      }

      const seeProfileService = new SeeProfileService();
      const resp = await seeProfileService.execute(uId);

      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message);
    }
  }
}
