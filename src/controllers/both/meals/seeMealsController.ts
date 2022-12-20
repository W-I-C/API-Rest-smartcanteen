import { Request, Response } from "express";
import { SeeMealsService } from "../../../services/both/meals/seeMealsService";


export class SeeMealsController {
    async handle(request: Request, response: Response) {
        const barId = request.params.barId;
        const uId=response.locals.uid;
        try {
            if(barId === undefined) {
                throw new Error("Invalid request");
            }

            const seeMealsService = new SeeMealsService();
            const resp = await seeMealsService.execute(barId,uId);

            response.status(resp.status).send(resp.data);
        } catch(e) {
            response.status(500).json(e.message)
        }
    }
}