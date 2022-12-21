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
   * Allows to edit the authenticated user's profile data, redirected afterwards to the associated service
   *
   * {@link editProfileService}
   * @param request request receive.
   * @param response response.
   */
  async handle(request: Request, response: Response) {
    const uId = response.locals.uid;
    let { preferredCampus, preferredBar, imgurl } = request.body

    try {
      if (uId === undefined || preferredCampus === undefined || preferredBar === undefined || imgurl === undefined) {
        throw new Error("Invalid request");
      }

      const editProfileService = new EditProfileService();
      const resp = await editProfileService.execute({uId, preferredCampus, preferredBar, imgurl});

      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message);
    }
  }
}