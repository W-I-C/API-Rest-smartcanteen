
/**
 * @module seeTicketsController
 */
import { Request, Response } from "express";
import { SeeTicketsService } from "../../../services/consumer/ticket/seeTicketsService";

/**
 * Class responsible for receiving and calling the service methods that allows you to see the available exchanges
 */

export class SeeTicketsController {

     /**
     * Allows to get a meal that the authenticated user has already added to favorites, redirected afterwards to the associated service
     *
     * {@link seeTicketsService}
     * 
     * @param response response.
     */
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