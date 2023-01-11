/**
 * @module seeTicketsHistoryService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";

/**
 * Class responsible for the service that serves to retrieve all the orders that the authenticated user has already placed
 */
export class SeeTicketsHistoryService {
    /**
     * Method that allows you to retrieve all orders placed by the authenticated user
     * @param uId authenticated user id
     */
    async execute(uId: string) {
        const seeTicketsHistoryDBClient = createClient();

        const query = await seeTicketsHistoryDBClient.query(`SELECT tickets.ticketid, nencomenda, ticketamount, total, states.name
                                                            FROM tickets
                                                            JOIN states ON tickets.stateid = states.stateid
                                                            WHERE tickets.uid = $1 AND tickets.isdeleted = $2`, [uId, false]) 
        
        const data = query["rows"]
                                            
        return { data, status: 200 }
    }
}