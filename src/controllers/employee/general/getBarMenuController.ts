/**
 * @module getBarStatisticsĈontroller
 */
import { Request, Response } from "express";
import { GetBarMenuService } from "../../../services/employee/general/getBarMenuService";

/**
 * Class responsible for receiving and calling the service methods that allow the employee to get bar menu
 */
export class GetBarMenuController {
  /**
 * Allows to get user bar menu, redirecting afterwards to the associated service
 *
 * {@link getBarMEnuService}
 * @param request request receive.
 * @param response response.
 */
  async handle(request: Request, response: Response) {

    const uId = response.locals.uid;

    try {
      const getBarMenuController = new GetBarMenuService();


      const resp = await getBarMenuController.execute(uId);

      response.status(resp.status).json(resp.data);
    } catch (e) {
      console.log(e.message)
      response.status(500).json(e.message)
    }
  }
}
