
import { Request, Response } from "express";
import { AcceptTradeGeneralService } from "../../../services/consumer/trades/acceptTradeGeneralService";

export class AcceptTradeGeneralController {
  async handle(request: Request, response: Response) {
    const uId = response.locals.uid;
    const generalTradeId = request.params.generalTradeId

    try {
      if (uId === undefined || generalTradeId === undefined) {
        throw new Error("Invalid request");
      }

      const acceptTradeGeneralService = new AcceptTradeGeneralService();
      const resp = await acceptTradeGeneralService.execute(uId, generalTradeId);

      response.status(resp.status).json(resp.msg);
    } catch (e) {
      response.status(500).json(e.message);
    }
  }
}