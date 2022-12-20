import { Request, Response } from "express";
import { AddFavService } from "../../../services/consumer/favoriteMeal/addFavService";

export class AddFavController {
    async handle(request: Request, response: Response) {
        const uId = response.locals.uId;
        const mealId=request.params.mealId;

        try {
            if(uId === undefined||
                mealId===undefined) {
                throw new Error("Invalid request");
            }

            const addFavService = new AddFavService();
            const resp = await addFavService.execute({
                uId,
                mealId});

            response.status(resp.status).json(resp.data);
        } catch(e) {
            response.status(500).json(e.message)
        }
    }
}