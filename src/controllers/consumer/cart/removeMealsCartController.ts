/**
 * @module removeMealsCartController
 */
import { Request, Response } from "express";
import { RemoveMealsCartService } from "../../../services/consumer/cart/removeMealCartService";


/**
 * Class responsible for receiving and calling the service methods that allows you remove a meal from a cart
 */
export class RemoveMealsCartController {
    async handle(request: Request, response: Response) {

         /**
     * Allows to get a cart meal that the authenticated user has already added to his cart
     *
     * {@link seeOneFavService}
     * @param request request receive.
     * @param response response.
     */
        const uId=response.locals.uid;
        const cartMealId = request.params.cartMealId;
      


        try {
            if(cartMealId === undefined)
            {
                throw new Error("Invalid request");
            }

            const removeMealsCartService = new RemoveMealsCartService();
            const resp = await removeMealsCartService.execute(cartMealId, uId);

            response.status(resp.status).json(resp.data);
        } catch(e) {
            response.status(500).json(e.message)
        }
    }
}