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
    async execute(uId: string, ticketId: string, stateId: string) {
        const ticketIdExists = await checkTicketExists(ticketId)

        if (!ticketIdExists) {
            throw new Error('Ticket does not exists')
        }

        // get the bar where the employee works
        const userBarId = await getEmployeeBar(uId);
        const ticketBarId = await getTicketBar(ticketId);

        if (userBarId != ticketBarId) {
            throw new Error('Bars are not the same')
        }

        const editTicketStateDBClient = createClient();

        const stateExists = await editTicketStateDBClient.query(`SELECT *  FROM states
                                                                WHERE stateid = $1`, [stateId])

        if(stateExists["rows"].length == 0){
            throw new Error("Invalid State")
        }

        const ticketStateId = await getTicketState(ticketId)
        const deliveredState = await getDeliveredStatusId()

        if (ticketStateId == deliveredState) {
            throw new Error('The ticket has already been delivered')
        }
        
        await editTicketStateDBClient.query(`UPDATE tickets
                                    SET stateid = $1
                                    WHERE ticketid = $2`, [stateId, ticketId])


        const query = await editTicketStateDBClient.query(`SELECT ticketid, stateid
                                                                FROM tickets
                                                                WHERE ticketid = $1`, [ticketId])

        await editTicketStateDBClient.end()

        let editedMeal = query["rows"][0]

        return { editedMeal, status: 200 }
    }
}
