import { Request, Response } from "express";
import { SeeAllowedChangesService } from "../../../services/both/meals/seeAllowedChangesService";

export class SeeAllowedChangesController {

    async handle(request: Request, response: Response) {
        const uId = response.locals.uid;
        const mealId = request.params.mealId

        try {
            if (uId === undefined || mealId == undefined) {
                throw new Error("Invalid request");
            }

            const seeAllowedChangesService = new SeeAllowedChangesService();
            const resp = await seeAllowedChangesService.execute(uId, mealId);

            response.status(resp.status).json(resp.data);
        } catch (e) {
            response.status(500).json(e.message)
        }
    }
}