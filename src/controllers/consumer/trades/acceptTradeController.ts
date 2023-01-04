/**
 * @module acceptTradeController
 */
import { Request, Response } from "express";
import { AcceptTradeService } from "../../../services/consumer/trades/acceptTradeService";

/**
 * Class responsible for receiving and calling the methods of the service that allows the user to accept the trade
 */
export class AcceptTradeController {
  /**
   * Allows to edit the data regarding the acceptance of the trade, redirecting afterwards to the associated service
   *
   * {@link acceptTradeService}
   * @param request request receive.
   * @param response response.
   */
  async handle(request: Request, response: Response) {
    const uId = response.locals.uid;
    const ticketId = request.params.ticketId
    let { receptorDecision } = request.body

    try {
      if (uId === undefined || ticketId === undefined || receptorDecision === undefined) {
        throw new Error("Invalid request");
      }

      const acceptTradeService = new AcceptTradeService();
      const resp = await acceptTradeService.execute({ uId, ticketId, receptorDecision });

      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message);
    }
  }
}