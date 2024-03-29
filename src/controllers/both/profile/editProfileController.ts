/**
 * @module editProfileController
 */
import { Request, Response } from "express";
import { EditProfileService } from "../../../services/both/profile/editProfileService";

/**
 * Class responsible for receiving and calling the methods of the service that allows the user to edit his profile
 */
export class EditProfileController {
  /**
   * Allows to edit the authenticated user's profile data, redirecting afterwards to the associated service
   *
   * {@link editProfileService}
   * @param request request receive.
   * @param response response.
   */
  async handle(request: Request, response: Response) {
    const uId = response.locals.uid;
    let { preferredCampus, preferredBar } = request.body

    try {
      if (uId === undefined || preferredCampus === undefined || preferredBar === undefined) {
        throw new Error("Invalid request");
      }

      const editProfileService = new EditProfileService();
      const resp = await editProfileService.execute({ uId, preferredCampus, preferredBar });

      response.status(resp.status).json(resp.data);
    } catch (e) {
      console.log(e.message);
      response.status(500).json(e.message);
    }
  }
}
