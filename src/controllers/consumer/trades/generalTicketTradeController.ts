/**ickets
 * @module generalTicketTradeController
 */
import { Request, Response } from "express";
import { GeneralTicketTradeService } from "../../../services/consumer/trades/generalTicketTradeService";

/**
 * Class responsible for receiving and calling the service methods that allows you to expose an order for general trading
 */

export class GeneralTicketTradeController {
  /**
   * Allows to expose order for genral trading, redirecting afterwards to the associated service
   *
   * {@link generalTicketTradeService}
   *
   * @param response response.
   */
  async handle(request: Request, response: Response) {
    const uId = response.locals.uid;
    const ticketId = request.params.ticketId
    let { isFree, paymentMethodId } = request.body

    try {
      if (uId === undefined || ticketId === undefined || isFree === undefined || paymentMethodId === undefined) {
        throw new Error("Invalid request");
      }

      const generalTicketTradeService = new GeneralTicketTradeService();
      const resp = await generalTicketTradeService.execute(uId, ticketId, isFree, paymentMethodId);

      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message);
    }
  }
}
