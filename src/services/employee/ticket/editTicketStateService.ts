/**
 * @module editTicketStateService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { checkTicketExists } from "../../../validations/consumer/ticket/removeTicketValidation";
import { getEmployeeBar } from "../../../validations/employee/meal/editMealValidation";
import { checkStateNameExists, getStateId, getTicketBar } from "../../../validations/employee/ticket/editTicketStateValidation";

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
        
        // TODO: pickuptime se estiver preenchido o ticket já foi entregue não existe - se mudar para entregue tem que se indicar o pickuptime
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

        const stateId = await getStateId(stateName)

        const editMealDBClient= createClient();
        await editMealDBClient.query(`UPDATE tickets
                                    SET stateid = $1
                                    WHERE ticketid = $2`, [stateId, ticketId])


        const query = await editMealDBClient.query(`SELECT ticketid, stateid
                                                                FROM tickets
                                                                WHERE ticketid = $1`, [ticketId])

        let editedMeal = query["rows"][0]   

        return { editedMeal , status: 200 }
    }
}