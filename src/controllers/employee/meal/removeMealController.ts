/**
 * @module removeMealController
 */
import { Request, Response } from "express";
import { RemoveMealService } from "../../../services/employee/meal/removeMealService";

/**
 * Class responsible for receiving and calling the methods of the service that allows the employee to remove a meal
 */
export class RemoveMealController {
  async handle(request: Request, response: Response) {
    /**
     * Allows to remove a meal, redirected afterwards to the associated service
     *
     * {@link removeMealService}
     * @param request request receive.
     * @param response response.
     */
    const uId = response.locals.uid
    const mealId = request.params.mealId;

    try {
      if (
        uId === undefined ||
        mealId === undefined
      ) {
        throw new Error("Pedido inválido");
      }

      const removeMealService = new RemoveMealService();
      const resp = await removeMealService.execute({
        uId,
        mealId,
      });

      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message);
    }
  }
}
