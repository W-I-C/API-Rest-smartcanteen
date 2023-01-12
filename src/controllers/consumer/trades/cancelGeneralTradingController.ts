import { Request, Response } from "express";
import { CancelGeneralTradingService } from "../../../services/consumer/trades/cancelGeneralTradingService";

export class CancelGeneralTradingController {
  async handle(request: Request, response: Response) {
    const uId = response.locals.uid;
    const generalTradeId = request.params.generalTradeId

    try {
      if (uId === undefined || generalTradeId === undefined) {
        throw new Error("Invalid request");
      }

      const cancelGeneralTradingService = new CancelGeneralTradingService();
      const resp = await cancelGeneralTradingService.execute(uId, generalTradeId);

      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message);
    }
  }
}
