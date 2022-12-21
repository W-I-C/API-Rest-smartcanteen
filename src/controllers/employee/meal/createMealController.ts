

//ver o codigo bem como se faz
import { Request, Response } from "express";
import { CreateMealService } from "../../../services/employee/meal/createMealService";

export class CreateMealController {
    async handle(request: Request, response: Response) {
        const barId= request.params.barId;
        const uId=response.locals.uid;
        let { name,
            preparationTime, 
            description,
            canTakeaway, 
            price,
            allowedChanges} = request.body;
               
        try {
            if (              
              barId=== undefined||
              name === undefined ||
              preparationTime === undefined ||
              description === undefined ||
              canTakeaway === undefined ||
              price === undefined||
              allowedChanges===undefined
              
            ) {
              throw new Error("Some parameter is incorrect");
            }

            const createMealService = new CreateMealService();

          
            const resp = await createMealService.execute({
                uId,
                barId,
                name,
                preparationTime,
                description,
                canTakeaway,
                price,
                allowedChanges
             });
 
            response.status(resp.status).json(resp.data);
        } catch(e) {
            response.status(500).json(e.message)
        }
    }
}