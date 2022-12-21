// TODO: ir buscar os tickets pelo bar do funcionário - validação para saber o bar do funcionário
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

        const query = await seeUndeliveredTicketsDBClient.query(`SELECT ticketid, users.name, states.name AS stateName
                                                                FROM tickets
                                                                JOIN states ON tickets.stateid = states.stateid
                                                                JOIN users ON tickets.uid = users.uid
                                                                WHERE tickets.barid = $1`, [barId]) 
        
        const data = query["rows"]
                                            
        return { data, status: 200 }
    }
}