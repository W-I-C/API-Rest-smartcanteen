/**
 * @module canBeMadeController
 */
import { Request, Response } from "express";
import { CreateMealService } from "../../../services/employee/meal/createMealService";
import { CanBeMadeService } from "../../../services/employee/meal/canBeMadeService";

/**
 * Class responsible for receiving and calling the service methods that allow the employee to indicate if the meal can be made
 */
export class CanBeMadeController {
  /**
 * Allows to indicate that a meal cant be made, redirecting afterwards to the associated service
 *
 * {@link canBeMadeService}
 * @param request request receive.
 * @param response response.
 */
  async handle(request: Request, response: Response) {

    const mealId = request.params.mealId
    const uid = response.locals.uid
    let { status } = request.body

    if (status === undefined || mealId === undefined || typeof status != "boolean") {
      response.status(500).send({ msg: "Some parameter is incorrect" })
    } else {

      const canBeMadeService = new CanBeMadeService();

      const resp = await canBeMadeService.execute(uid, mealId, status);

      response.status(resp.status).json(resp.data);
    }


  }
}