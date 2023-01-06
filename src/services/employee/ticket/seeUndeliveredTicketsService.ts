/**
 * @module seeUndeliveredTicketsService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { getEmployeeBar } from "../../../validations/employee/ticket/seeUndeliveredTicketValidation";

/**
 * Class responsible for the service that serves to retrieve all the orders that the authenticated user has already placed
 */
export class SeeUndeliveredTicketsService {
    /**
     * Method that allows you to retrieve all orders placed by the authenticated user
     * @param uId authenticated user id
     */
    async execute(uId: string) {
        const seeUndeliveredTicketsDBClient = createClient();
    
        const barId = await getEmployeeBar(uId);

        const stateId = "5669f7ec-4991-4dee-a1f4-9b944580ac33"

        const query = await seeUndeliveredTicketsDBClient.query(`SELECT ticketid, nencomenda, users.name, states.name AS stateName
                                                                FROM tickets
                                                                JOIN states ON tickets.stateid = states.stateid
                                                                JOIN users ON tickets.uid = users.uid
                                                                WHERE tickets.barid = $1 AND tickets.isdeleted = $2 AND tickets.ispickedup = $3 AND tickets.stateid != $4`, [barId, false, false, stateId]) 
        
        const data = query["rows"]
                                            
        return { data, status: 200 }
    }
}