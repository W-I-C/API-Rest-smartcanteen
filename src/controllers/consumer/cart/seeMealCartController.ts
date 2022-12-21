import { Request, Response } from "express";
import { SeeMealsCartService } from "../../../services/consumer/cart/seeMealCartService";



export class SeeMealsCartController {
    async handle(request: Request, response: Response) {
        
        const uId=response.locals.uid;
        
        try {
            const seeMealsCartService = new SeeMealsCartService();
            const resp = await seeMealsCartService.execute(uId);

            response.status(resp.status).send(resp.data);
        } catch(e) {
            response.status(500).json(e.message)
        }
    }
}