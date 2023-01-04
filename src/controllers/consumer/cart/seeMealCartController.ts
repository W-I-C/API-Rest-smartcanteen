/**
 * @module seeMealsCartController
 */
import { Request, Response } from "express";
import { SeeMealsCartService } from "../../../services/consumer/cart/seeMealCartService";


/**
 * Class responsible for receiving and calling the methods of the service that allows the consumer to see a meal at cart
 */
export class SeeMealsCartController {
    async handle(request: Request, response: Response) {
        /**
    * Allows to remove a meal, redirecting afterwards to the associated service
    *
    * {@link seeeMealsCartService}
    * @param response response.
    */
        const uId = response.locals.uid;

        try {
            const seeMealsCartService = new SeeMealsCartService();
            const resp = await seeMealsCartService.execute(uId);

            response.status(resp.status).send(resp.data);
        } catch (e) {
            response.status(500).json(e.message)
        }
    }
}