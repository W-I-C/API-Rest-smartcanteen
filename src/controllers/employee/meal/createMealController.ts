/**
 * @module createMealController
 */
import { Request, Response } from "express";
import { CreateMealService } from "../../../services/employee/meal/createMealService";

/**
 * Class responsible for receiving and calling the service methods that allow the employee to create a meal in a bar
 */
export class CreateMealController {
    /**
   * Allows to get a meal that the authenticated user has already added to favorites, redirecting afterwards to the associated service
   *
   * {@link createMealService}
   * @param request request receive.
   * @param response response.
   */
    async handle(request: Request, response: Response) {
        const barId = request.params.barId;
        const uId = response.locals.uid;
        let { name,
            preparationTime,
            description,
            canTakeaway,
            price,
            allowedChanges } = request.body;

        try {
            if (
                barId === undefined ||
                name === undefined ||
                preparationTime === undefined ||
                description === undefined ||
                canTakeaway === undefined ||
                price === undefined ||
                allowedChanges === undefined ||
                typeof preparationTime != "number" ||
                typeof canTakeaway != "boolean" ||
                typeof price != "number"
            ) {
                throw new Error("Some parameter is incorrect");
            }

            const createMealService = new CreateMealService();


            const resp = await createMealService.execute({
                uId,
                barId,
                name,
                preparationTime,
                description,
                canTakeaway,
                price,
                allowedChanges
            });

            response.status(resp.status).json(resp.meal);
        } catch (e) {
            response.status(500).json(e.message)
        }
    }
}