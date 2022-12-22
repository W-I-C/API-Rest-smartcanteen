import { Request, Response } from "express";
import { AddMealCartService } from "../../../services/consumer/cart/addMealCartService";


export class AddMealCartController {
    async handle(request: Request, response: Response) {
        const uId=response.locals.uid;
        const mealId = request.params.mealId;
        
        let { amount } = request.body;
        
        try {
            if(uId === undefined||
                mealId=== undefined||
                amount===undefined) {
                throw new Error("Invalid request");
            }

            const addMealCartService = new AddMealCartService();
            const resp = await addMealCartService.execute(mealId,uId,amount);

            response.status(resp.status).json(resp.data);
        } catch(e) {
            response.status(500).json(e.message)
        }
    }
}