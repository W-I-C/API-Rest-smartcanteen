/**
 * @module seeMealsDetailsController
 */
import { Request, Response } from "express";
import { SeeMealsDetailService } from "../../../services/both/meals/SeeMealsDetailService";


/**
 * Class responsible for receiving and calling the service methods that allow the user to see the details of a meal he has choose
 */

export class SeeMealsDetailController {
    async handle(request: Request, response: Response) {
         /**
     * Allows to get a meal that the authenticated user has choose
     *
     * {@link seeMealsDetailService}
     * @param request request receive.
     * @param response response.
     */
        const uId=response.locals.uid;
        const mealId=request.params.mealid;
        
        try {
            const seeMealsDetailService = new SeeMealsDetailService();
            const resp = await seeMealsDetailService.execute(uId,mealId);

            response.status(resp.status).send(resp.data);
        } catch(e) {
            response.status(500).json(e.message)
        }
    }
}