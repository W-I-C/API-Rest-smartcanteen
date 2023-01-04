/**
 * @module seeUndeliveredTicketsController
 */
import { Request, Response } from "express";
import { SeeUndeliveredTicketsService } from "../../../services/employee/ticket/seeUndeliveredTicketsService";

/**
 * Class responsible for receiving and calling the service methods that allow the employee to see all the orders that consumers have placed at the bar where he works
 */
export class SeeUndeliveredTicketsController {
    /**
     * Allows to obtain all orders placed by consumers, redirecting afterwards to the associated service
     *
     * {@link seeUndeliveredTicketsService}
     * @param request request receive.
     * @param response response.
     */
    async handle(request: Request, response: Response) {
        const uId = response.locals.uid;

        try {
            if (uId === undefined) {
                throw new Error("Invalid request");
            }

            const seeUndeliveredTicketsService = new SeeUndeliveredTicketsService();
            const resp = await seeUndeliveredTicketsService.execute(uId);

            response.status(resp.status).json(resp.data);
        } catch (e) {
            response.status(500).json(e.message)
        }
    }
}