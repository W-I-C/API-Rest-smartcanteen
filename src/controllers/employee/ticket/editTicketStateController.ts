/**
 * @module editTicketStateController
 */
import { Request, Response } from "express";
import { EditTicketStateService } from "../../../services/employee/ticket/editTicketStateService";

/**
 * Class responsible for receiving and calling the methods of the service that allows the employee to edit the state of a ticket
 */
export class EditTicketStateController {
  async handle(request: Request, response: Response) {
    /**
     * Allows to edit a the state of a ticket, redirecting afterwards to the associated service
     *
     * {@link editTicketStateService}
     * @param request request receive.
     * @param response response.
     */
    const uId = response.locals.uid
    const ticketId = request.params.ticketId;
    const stateId = request.params.stateId;

    try {
      if (
        uId === undefined ||
        ticketId === undefined ||
        stateId === undefined
      ) {
        throw new Error("Invalid request");
      }

      const editTicketStateService = new EditTicketStateService();
      const resp = await editTicketStateService.execute(
        uId,
        ticketId,
        stateId
      );
      response.status(resp.status).json(resp.editedMeal);
    } catch (e) {
      response.status(500).json(e.message);
    }
  }
}
