/**
 * @module removeFavController
 */
import { Request, Response } from "express";
import { GetNotificiationsService } from "../../../services/consumer/notifications/getNotificationsService";

/**
 * Class responsible for receiving and calling the service methods that allow the user to get a notification
 */
export class GetNotificationsController {
  /**
 * Allows user to get all his notifications, redirecting afterwards to the associated service
 *
 * {@link getNotificationsService}
 * @param request request receive.
 * @param response response.
 */
  async handle(request: Request, response: Response) {
    const uId = response.locals.uid;

    try {
      if (uId === undefined) {
        throw new Error("Invalid request");
      }

      const getNotificationsService = new GetNotificiationsService();
      const resp = await getNotificationsService.execute(uId);

      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}