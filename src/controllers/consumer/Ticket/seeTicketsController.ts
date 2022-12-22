import { Request, Response } from "express";
import { SeeTicketsService } from "../../../services/consumer/Ticket/seeTicketsService";






export class SeeTicketsController {
    async handle(request: Request, response: Response) {
        const uId=response.locals.uid;
  
        
     
        
        try {
            if(uId === undefined) {
                throw new Error("Invalid request");
            }

            const seeTicketsService = new SeeTicketsService();
            const resp = await seeTicketsService.execute();

            response.status(resp.status).json(resp.data);
        } catch(e) {
            response.status(500).json(e.message)
        }
    }
}