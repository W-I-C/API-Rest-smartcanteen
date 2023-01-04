/**
 * @module seeProfileController
 */
import { Request, Response } from "express";
import { SeeProfileService } from "../../../services/both/profile/seeProfileService";

/**
 * Class responsible for receiving and calling the methods of the service that allows the user to see the data from his profile
 */
export class SeeProfileController {
  /**
   * Allows to obtain all the user's data, redirecting afterwards to the associated service
   *
   * {@link seeProfileService}
   * @param request request receive.
   * @param response response.
   */
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
