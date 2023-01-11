/**
 * @module acceptTradeValidation
 */
import { createClient } from "../../../config/db";

/**
 * In order to accept an exchange proposed by another user,
 * it is first necessary to check if the exchange exists (if it has been proposed)
 * Allows to check if the trade exists
 * 
 * @param ticketId id of the ticket/order to accept the trade
 */
export async function checkTradeExists(ticketId: string) {
    const checkTradeExistsDBClient = createClient();
    const query = await checkTradeExistsDBClient.query(`SELECT ticketid FROM tickettrade
                                                        WHERE ticketid = $1 AND isdeleted = $2`, [ticketId, false]);
                      
    await checkTradeExistsDBClient.end() 

    return query['rows'].length != 0
}

/**
 * A direct exchange takes place between a sender and a receiver. 
 * It is first necessary to verify that the authenticated person is the recipient of the proposed exchange
 * 
 * @param uId id of the authenticated user (the receiver)
 * @param ticketId id of the ticket/order to accept the trade
 */
export async function checkUserIsReceiver(uId: string, ticketId: string) {
    const checkUserIsReceiverDBClient = createClient();
    const query = await checkUserIsReceiverDBClient.query(`SELECT ticketid FROM tickettrade
                                                        WHERE uid = $1 AND ticketid = $2`, [uId, ticketId]);
                  
    await checkUserIsReceiverDBClient.end() 

    return query['rows'].length != 0
}


