import { Request, Response } from "express";
import { SeeTicketsHistoryService } from "../../../services/consumer/ticket/seeTicketsHistoryService";





export class SeeTicketsHistoryController {
    async handle(request: Request, response: Response) {
        const uId=response.locals.uid;
  
        
     
        
        try {
            if(uId === undefined) {
                throw new Error("Invalid request");
            }

            const seeTicketsHistoryService = new SeeTicketsHistoryService();
            const resp = await seeTicketsHistoryService.execute(uId);

            response.status(resp.status).json(resp.data);
        } catch(e) {
            response.status(500).json(e.message)
        }
    }
}