import { Request, Response } from "express";
import { SeeTradePaymentMethodService } from "../../../services/consumer/trades/seeTradePaymentMethodService";

export class SeeTradePaymentMethodController {

  async handle(request: Request, response: Response) {
    const uId = response.locals.uid;
    const generalTradeId = request.params.generalTradeId

    try {
      if (uId === undefined || generalTradeId === undefined) {
        throw new Error("Invalid request");
      }

      const seeTradePaymentMethodService = new SeeTradePaymentMethodService();
      const resp = await seeTradePaymentMethodService.execute(uId, generalTradeId);

      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message);
    }
  }
}
