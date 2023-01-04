/**
 * @module seeTradesHistoryController
 */
import { Request, Response } from "express";
import { SeeTradesHistoryService } from "../../../services/consumer/trades/seeTradesHistoryService";

/**
 * Class responsible for receiving and calling the service methods that allows you to see the history of consumer exchanges
 */

export class SeeTradesHistoryController {
  async handle(request: Request, response: Response) {
    /**
     * Allows to get a meal that the authenticated user has already added to favorites, redirecting afterwards to the associated service
     *
     * {@link seeTradesHistoryService}
     *
     * @param response response.
     */
    const uId = response.locals.uid;

    try {
      if (uId === undefined) {
        throw new Error("Invalid request");
      }

      const seeTradesHistoryService = new SeeTradesHistoryService();
      const resp = await seeTradesHistoryService.execute(uId);

      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message);
    }
  }
}
