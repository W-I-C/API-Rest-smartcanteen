/**
 * @module removeTicketValidation
 */
import { createClient } from "../../../config/db";

/**
 * To remove an order from the history, we need to check if the order the user
 * want to remove exists in the history of orders placed so far
 * 
 * @param ticketId id of the ticket/order to remove
 */
export async function checkTicketExists(ticketId: string) {
    const checkTicketExistsDBClient = createClient();
    const query = await checkTicketExistsDBClient.query(`SELECT ticketid FROM tickets
                                                        WHERE ticketid = $1`, [ticketId]);
                                          
    return query['rows'].length != 0
}