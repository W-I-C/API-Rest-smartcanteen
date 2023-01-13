import { Request, Response } from "express";
import { SeeStatesService } from "../../../services/both/states/seeStatesServices";

export class SeeStatesController {

  async handle(request: Request, response: Response) {
    const uId = response.locals.uid;


    try {
      if (
        uId === undefined

      ) {
        throw new Error("Some parameter is incorrect");
      }

      const seeStatesService = new SeeStatesService();


      const resp = await seeStatesService.execute(uId);

      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}