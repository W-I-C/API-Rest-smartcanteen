/**ickets
 * @module seeTradesController
 */
import { Request, Response } from "express";
import { SeeTradesService } from "../../../services/consumer/trades/seeTradesService";

/**
 * Class responsible for receiving and calling the service methods that allows you to see the available exchanges
 */

export class SeeTradesController {
  /**
   * Allows to get a meal that the authenticated user has already added to favorites, redirected afterwards to the associated service
   *
   * {@link seeTradesService}
   *
   * @param response response.
   */
  async handle(request: Request, response: Response) {
    const uId = response.locals.uid;

    try {
      if (uId === undefined) {
        throw new Error("Invalid request");
      }

      const seeTradesService = new SeeTradesService();
      const resp = await seeTradesService.execute();

      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message);
    }
  }
}
