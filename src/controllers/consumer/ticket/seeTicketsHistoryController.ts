/**
 * @module seeTicketsHistoryController
 */
import { Request, Response } from "express";
import { SeeTicketsHistoryService } from "../../../services/consumer/ticket/seeTicketsHistoryService";

/**
 * Class responsible for receiving and calling the service methods that allows you to see the history of consumer exchanges
 */

export class SeeTicketsHistoryController {
    async handle(request: Request, response: Response) {
         /**
     * Allows to get a meal that the authenticated user has already added to favorites, redirected afterwards to the associated service
     *
     * {@link seeTicketsHistoryService}
     * 
     * @param response response.
     */
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