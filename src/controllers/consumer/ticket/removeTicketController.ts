/**
 * @module removeTicketController
 */
import { Request, Response } from "express";
import { RemoveTicketService } from "../../../services/consumer/ticket/removeTicketService";

// TODO: passar para put e meter o isDeleted no histórico a true - nós vemos mas o utilizador não
// TODO: para as trocas a mesma coisa
/**
 * Class responsible for receiving and calling the service methods that allow the user to remove a order
 */
export class RemoveTicketController {
    /**
   * Allows you to remove a order, redirecting afterwards to the associated service
   *
   * {@link removeTicketService}
   * @param request request receive.
   * @param response response.
   */
    async handle(request: Request, response: Response) {
        const uId = response.locals.uid;
        const ticketId = request.params.ticketId;

        try {
            if (uId === undefined || ticketId === undefined) {
                throw new Error("Invalid request");
            }

            const removeTicketService = new RemoveTicketService();
            const resp = await removeTicketService.execute(uId, ticketId);

            response.status(resp.status).json(resp.msg);
        } catch (e) {
            response.status(500).json(e.message)
        }
    }
}