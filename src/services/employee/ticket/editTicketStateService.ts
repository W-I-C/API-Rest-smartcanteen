/**
 * @module editTicketStateService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { getDeliveredStatusId } from "../../../helpers/dbHelpers";
import { checkTicketExists } from "../../../validations/consumer/ticket/removeTicketValidation";
import { getEmployeeBar } from "../../../validations/employee/meal/editMealValidation";
import { checkStateNameExists, getStateId, getTicketBar, getTicketState } from "../../../validations/employee/ticket/editTicketStateValidation";

/**
 * Class responsible for the service that serves to edit the state of a ticket
 */
export class EditTicketStateService {
    /**
     * Method that allows the employee to edit the state of a ticket
     * 
     * @param uId authenticated user id
     * @param ticketId ticket to be edited the state
     * @param stateName qname of the state to associate to the ticket
     */
    async execute(uId: string, ticketId: string, stateName: string) {
        const ticketIdExists = await checkTicketExists(ticketId)

        if(!ticketIdExists){
            throw new Error('Ticket does not exists')
        }

        const stateNameExists = await checkStateNameExists(stateName)

        if(!stateNameExists){
            throw new Error('State does not exists')
        }

        // get the bar where the employee works
        const userBarId = await getEmployeeBar(uId);
        const ticketBarId = await getTicketBar(ticketId);

        if(userBarId != ticketBarId) {
            throw new Error('Bars are not the same')
        }

        const stateNameTicket = await getStateId(stateName)

        const ticketStateId = await getTicketState(ticketId)
        const deliveredState = await getDeliveredStatusId()

        if(ticketStateId == deliveredState) {
            throw new Error('The ticket has already been delivered')
        }

        const editMealDBClient= createClient();
        await editMealDBClient.query(`UPDATE tickets
                                    SET stateid = $1
                                    WHERE ticketid = $2`, [stateNameTicket, ticketId])


        const query = await editMealDBClient.query(`SELECT ticketid, stateid
                                                                FROM tickets
                                                                WHERE ticketid = $1`, [ticketId])

        let editedMeal = query["rows"][0]   

        return { editedMeal , status: 200 }
    }
}