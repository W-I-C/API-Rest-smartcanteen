import { Request, Response } from "express";
import { RemoveMealsCartService } from "../../../services/consumer/cart/removeMealCartService";



export class RemoveMealsCartController {
    async handle(request: Request, response: Response) {
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