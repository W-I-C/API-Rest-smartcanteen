import { Request, Response } from "express";
import { SeeFavService } from "../../../services/consumer/FavoriteMeal/seeFavService";

export class SeeFavController {
    async handle(request: Request, response: Response) {
        const uId = request.params.uid;

        try {
            if(uId === undefined) {
                throw new Error("Invalid request");
            }

            const seeFavService = new SeeFavService();
            const resp = await seeFavService.execute(uId);

            response.status(resp.status).json(resp.data);
        } catch(e) {
            response.status(500).json(e.message)
        }
    }
}