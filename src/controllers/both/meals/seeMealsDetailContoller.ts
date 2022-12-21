import { Request, Response } from "express";
import { SeeMealsDetailService } from "../../../services/both/meals/SeeMealsDetailService";




export class SeeMealsDetailController {
    async handle(request: Request, response: Response) {
        
        const uId=response.locals.uid;
        
        try {
            const seeMealsDetailService = new SeeMealsDetailService();
            const resp = await seeMealsDetailService.execute(uId);

            response.status(resp.status).send(resp.data);
        } catch(e) {
            response.status(500).json(e.message)
        }
    }
}