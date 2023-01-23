import { Request, Response } from "express";
import { SeeDirectTradePaymentMethodService } from "../../../services/consumer/trades/seeDirectTradePaymentMethodService";

export class SeeDirectTradePaymentMethodController {

  async handle(request: Request, response: Response) {
    const uId = response.locals.uid;
    const tradeId = request.params.tradeId

    try {
      if (uId === undefined || tradeId === undefined) {
        throw new Error("Invalid request");
      }

      const seeDirectTradePaymentMethodService = new SeeDirectTradePaymentMethodService();
      const resp = await seeDirectTradePaymentMethodService.execute(uId, tradeId);

      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message);
    }
  }
}
