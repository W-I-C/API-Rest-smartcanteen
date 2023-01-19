

import { Request, Response } from "express";
import { GetCampusBarsService } from "../../../services/both/campus/getCampusBarsService";
import { GetCampusService } from "../../../services/both/campus/getCampusService";


export class GetCampusController {
  async handle(request: Request, response: Response) {
    const uId = response.locals.uid;
    try {
      if (uId === undefined) {
        throw new Error("Invalid request");
      }

      const getCampusService = new GetCampusService();

      const resp = await getCampusService.execute(uId);

      response.status(resp.status).send(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}