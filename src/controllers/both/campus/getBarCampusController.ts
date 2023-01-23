
import { Request, Response } from "express";
import { GetBarCampusService } from "../../../services/both/campus/getBarCampusService";

/**
 * Class responsible for receiving and calling the methods of the service that allows both to see all available bars in campus
 */
export class GetBarCampusController {
  async handle(request: Request, response: Response) {
    const uId = response.locals.uid;
    const campusId=request.params.campusId
    try {
      if (uId === undefined||
        campusId===undefined) {
        throw new Error("Invalid request");
      }

      const getBarCampusService = new GetBarCampusService();

      const resp = await getBarCampusService.execute(uId,campusId);

      response.status(resp.status).send(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}