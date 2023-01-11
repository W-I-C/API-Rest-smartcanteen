/**
 * @module getCampusBarsController
 */

import { Request, Response } from "express";
import { GetCampusBarsService } from "../../../services/both/campus/getCampusBarsService";

/**
 * Class responsible for receiving and calling the methods of the service that allows both to see all available bars in campus
 */
export class GetCAmpusBarsController {
  async handle(request: Request, response: Response) {
    const uId = response.locals.uid;
    try {
      if (uId === undefined) {
        throw new Error("Invalid request");
      }

      const getCampusBarsService = new GetCampusBarsService();

      const resp = await getCampusBarsService.execute(uId);

      response.status(resp.status).send(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}