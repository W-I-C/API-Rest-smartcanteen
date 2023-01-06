/**
 * @module getBarStatisticsĈontroller
 */
import { Request, Response } from "express";
import { GetBarStatisticsService } from "../../../services/employee/general/getBarStatisticsService";

/**
 * Class responsible for receiving and calling the service methods that allow the employee to get bar statistics
 */
export class GetBarStatisticsController {
  /**
 * Allows to get user bar statistics, redirecting afterwards to the associated service
 *
 * {@link getBarStatisticsService}
 * @param request request receive.
 * @param response response.
 */
  async handle(request: Request, response: Response) {
    const barId = request.params.barId;
    const uId = response.locals.uid;

    try {
      if (barId === undefined) {
        throw new Error("Some parameter is incorrect");
      }

      const getBarStatisticsController = new GetBarStatisticsService();


      const resp = await getBarStatisticsController.execute(uId, barId);

      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}