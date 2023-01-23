/**
 * @module addMealCartController
 */
import { Request, Response } from "express";
import { AddMealCartService } from "../../../services/consumer/cart/addMealCartService";

/**
 * Class responsible for receiving and calling the service methods that allow the consumer to add a meal in his cart
 */
export class AddMealCartController {
    /**
   * Allows to get a meal that the authenticated user has already added to favorites, redirecting afterwards to the associated service
   *
   * {@link addMealCartService}
   * @param request request receive.
   * @param response response.
   */
    async handle(request: Request, response: Response) {
        const uId = response.locals.uid;
        const mealId = request.params.mealId;
        let { amount,changes } = request.body;

        try {
            if (uId === undefined ||
                mealId === undefined ||
                amount === undefined ||
                changes=== undefined) {
                throw new Error("Invalid request");
            }

            const addMealCartService = new AddMealCartService();
            const resp = await addMealCartService.execute(uId, mealId, amount,changes);

            response.status(resp.status).send(resp.data);
        } catch (e) {
            response.status(500).json(e.message)
        }
    }
}