import { Request, Response } from "express";
import { RemoveFavService } from "../../../services/consumer/favoriteMeal/removeFavService";

export class RemoveFavController {
    async handle(request: Request, response: Response) {
        const uId = request.params.userId;
        const favMealId = request.params.favoriteMealId;

        try {
            if(uId === undefined || favMealId === undefined) {
                throw new Error("Invalid request");
            }

            const removeFavService = new RemoveFavService();
            const resp = await removeFavService.execute(uId, favMealId);

            response.status(resp.status).json(resp.data);
        } catch(e) {
            response.status(500).json(e.message)
        }
    }
}