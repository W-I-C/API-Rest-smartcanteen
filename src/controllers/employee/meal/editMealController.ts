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
     * Allows to edit a meal, redirecting afterwards to the associated service
     *
     * {@link editMealService}
     * @param request request receive.
     * @param response response.
     */
    const uId = response.locals.uid
    const mealId = request.params.mealId;

    let { name, preparationTime, description, canTakeAway, price } = request.body;

    try {
      console.log(uId)
      console.log(mealId)
      console.log(name)
      console.log(preparationTime)
      console.log(description)
      console.log(canTakeAway)
      console.log(price)
      if (
        uId === undefined ||
        mealId === undefined ||
        name === undefined ||
        preparationTime === undefined ||
        description === undefined ||
        canTakeAway === undefined ||
        price === undefined ||
        typeof preparationTime != "number" || 
        typeof canTakeAway != "boolean" || 
        typeof price != "number"
      ) {
        throw new Error("Invalid request");
      }

      const editMealService = new EditMealService();
      const resp = await editMealService.execute(
        uId,
        mealId,
        name,
        preparationTime,
        description,
        canTakeAway,
        price
      );
      response.status(resp.status).json(resp.msg);
    } catch (e) {
      console.log(e.message)
      response.status(500).json(e.message);
    }
  }
}
