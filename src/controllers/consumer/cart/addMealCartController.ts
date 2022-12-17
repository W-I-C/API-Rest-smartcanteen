import { Request, Response } from "express";
import { AddMealCartService } from "../../../services/consumer/cart/addMealCartService";


export class AddMealCartController {
    async handle(request: Request, response: Response) {
        const favoriteMealId = request.params.id;

        try {
            if(favoriteMealId === undefined) {
                throw new Error("Invalid request");
            }

            const addMealCartService = new AddMealCartService();
            const resp = await addMealCartService.execute(favoriteMealId);

            response.status(resp.status).json(resp.data);
        } catch(e) {
            response.status(500).json(e.message)
        }
    }
}