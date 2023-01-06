/**
 * @module completeCartController
 */
import { Request, Response } from "express";
import { CompleteCartService } from "../../../services/consumer/cart/completeCartService";

/**
 * Class responsible for receiving and calling the service methods that allow the consumer to complete his cart
 */
export class CompleteCartController {
  /**
 * Allows to complete cart, redirecting afterwards to the associated service
 *
 * {@link CompleteCartService}
 * @param request request receive.
 * @param response response.
 */
  async handle(request: Request, response: Response) {
    const uId = response.locals.uid;
    const cartId = request.params.cartId;

    let { paymentmethodid, barid, ticketAmount, pickuptime, istakingaway } = request.body;

    try {
      if (uId === undefined ||
        cartId === undefined ||
        paymentmethodid === undefined ||
        barid === undefined ||
        pickuptime === undefined ||
        istakingaway === undefined) {
        throw new Error("Invalid request");
      }

      const completeCartService = new CompleteCartService();
      const resp = await completeCartService.execute({ uId, paymentmethodid, barid, cartId, pickuptime, istakingaway }, ticketAmount);

      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}