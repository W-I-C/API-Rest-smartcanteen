/**
 * @module seedetailMealController
 */
import { Request, Response } from "express";
import { SeeDetailsMealTicketService } from "../../../services/both/tickets/seeDetailsMealTicketService";


/**
 * Class responsible for receiving and calling the service methods that allow the employee to get details from order
 */
export class SeeDetailsMealTicketController {
      /**
     * Allows to get a meals detail from order
     *
     * {@link createmealService}
     * @param request request receive.
     * @param response response.
     */
    async handle(request: Request, response: Response) {
        const ticketId= request.params.ticketId;
        const uId=response.locals.uid;
        
               
        try {
            if (              
              ticketId=== undefined
 
            ) {
              throw new Error("Some parameter is incorrect");
            }

            const seeDetailsMealTicketService = new SeeDetailsMealTicketService();

          
            const resp = await seeDetailsMealTicketService.execute(
              ticketId,
              
             );
 
            response.status(resp.status).json(resp.data);
        } catch(e) {
            response.status(500).json(e.message)
        }
    }
}