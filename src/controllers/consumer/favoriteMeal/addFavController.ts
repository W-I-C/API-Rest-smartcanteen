import { Request, Response } from "express";
import { AddFavService } from "../../../services/consumer/FavoriteMeal/addFavService";

export class AddFavController {
    async handle(request: Request, response: Response) {
        const favoriteMealId = request.params.mealId;

        try {
            if(favoriteMealId === undefined) {
                throw new Error("Invalid request");
            }

            const addFavService = new AddFavService();
            const resp = await addFavService.execute(favoriteMealId);

            response.status(resp.status).json(resp.data);
        } catch(e) {
            response.status(500).json(e.message)
        }
    }
}