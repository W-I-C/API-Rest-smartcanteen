/**ickets
 * @module directTicketTradeController
 */
import { Request, Response } from "express";
import { DirectTicketTradeService } from "../../../services/consumer/trades/directTicketTradeService";

/**
 * Class responsible for receiving and calling the service methods that allows you to make a direct trade with a user
 */

export class DirectTicketTradeController {
  /**
   * Allows to make a direct trade proposal to a user, redirecting afterwards to the associated service
   *
   * {@link directTicketTradeService}
   *
   * @param response response.
   */
  async handle(request: Request, response: Response) {
    const uId = response.locals.uid;
    const ticketId = request.params.ticketId
    let { receiverEmail, isFree, paymentMethodId } = request.body

    try {
      if (uId === undefined || ticketId === undefined || receiverEmail === undefined || isFree === undefined) {
        throw new Error("Invalid request");
      }

      const directTicketTradeService = new DirectTicketTradeService();
      const resp = await directTicketTradeService.execute(uId, receiverEmail, ticketId, isFree, paymentMethodId);

      response.status(resp.status).json(resp.data);
    } catch (e) {
      console.log(e.message)
      response.status(500).json(e.message);
    }
  }
}
