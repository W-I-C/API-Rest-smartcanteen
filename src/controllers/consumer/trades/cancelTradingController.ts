/**ickets
 * @module cancelTradingController
 */
import { Request, Response } from "express";
import { CancelTradingService } from "../../../services/consumer/trades/cancelTradingService";

/**
 * Class responsible for receiving and calling the service methods that allows you to cancel your ticket trade
 */

export class CancelTradingController {
  /**
   * Allows to cancel ticke trading, redirecting afterwards to the associated service
   *
   * {@link directTicketTradeService}
   *
   * @param response response.
   */
  async handle(request: Request, response: Response) {
    const uId = response.locals.uid;
    const ticketId = request.params.ticketId

    try {
      if (uId === undefined || ticketId === undefined) {
        throw new Error("Invalid request");
      }

      const cancelTradingService = new CancelTradingService();
      const resp = await cancelTradingService.execute(uId, ticketId);

      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message);
    }
  }
}
