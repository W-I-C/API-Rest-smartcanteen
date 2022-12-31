/**
 * @module editMealController
 */
import { Request, Response } from "express";
import { EditMealService } from "../../../services/employee/meal/editMealService";

/**
 * Class responsible for receiving and calling the methods of the service that allows the employee to edit a meal
 */
export class EditMealController {
  async handle(request: Request, response: Response) {
    /**
     * Allows to edit a meal, redirected afterwards to the associated service
     *
     * {@link editMealService}
     * @param request request receive.
     * @param response response.
     */
    const uId = response.locals.uid
    const mealId = request.params.mealId;

    let { name, preparationTime, description, canTakeaway, price, allowedChanges } = request.body;

    try {
      if (
        uId === undefined ||
        mealId === undefined ||
        name === undefined ||
        preparationTime === undefined ||
        description === undefined ||
        canTakeaway === undefined ||
        price === undefined ||
        allowedChanges === undefined
      ) {
        throw new Error("Invalid request");
      }

      const editMealService = new EditMealService();
      const resp = await editMealService.execute({
        uId,
        mealId,
        name,
        preparationTime,
        description,
        canTakeaway,
        price,
        allowedChanges
      });
      
      response.status(resp.status).json(resp.editedMeal);
    } catch (e) {
      response.status(500).json(e.message);
    }
  }
}
