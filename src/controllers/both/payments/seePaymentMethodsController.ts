import { Request, Response } from "express";
import { SeePaymentMehodsService } from "../../../services/both/payments/seePaymentMethodsService";

export class SeePaymentMehodsController {

  async handle(request: Request, response: Response) {

    try {
      const seePaymentMehodsService = new SeePaymentMehodsService();
      const resp = await seePaymentMehodsService.execute();

      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message);
    }
  }
}
