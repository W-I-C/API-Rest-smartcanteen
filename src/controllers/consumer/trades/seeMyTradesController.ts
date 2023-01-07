import { Request, Response } from "express";
import { SeeMyTradesService } from "../../../services/consumer/trades/seeMyTradesService";

export class SeeMyTradesController {
  async handle(request: Request, response: Response) {

    const uId = response.locals.uid;

    try {
      if (uId === undefined) {
        throw new Error("Invalid request");
      }

      const seeMyTradesService = new SeeMyTradesService();
      const resp = await seeMyTradesService.execute(uId);

      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message);
    }
  }
}
