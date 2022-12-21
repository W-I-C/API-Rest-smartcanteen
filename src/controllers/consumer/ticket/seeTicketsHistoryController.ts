/**
 * @module seeTicketsHistoryController
 */
import { Request, Response } from "express";
import { SeeTicketsHistoryService } from "../../../services/consumer/ticket/seeTicketsHistoryService";

/**
 * Class responsible for receiving and calling the service methods that allow the user to see all the orders the authenticated user has already placed
 */
export class SeeTicketsHistoryController {
    /**
     * Allows to get all orders that the authenticated user has placed, redirected afterwards to the associated service
     *
     * {@link seeTicketsHitoryService}
     * @param request request receive.
     * @param response response.
     */
    async handle(request: Request, response: Response) {
        const uId = response.locals.uid;
        
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