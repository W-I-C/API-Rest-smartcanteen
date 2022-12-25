import { createClient } from "../../../config/db";

export async function checkTradeExists(ticketId: string) {
    const checkTradeExistsDBClient = createClient();
    const query = await checkTradeExistsDBClient.query(`SELECT ticketid FROM tickettrade
                                                        WHERE ticketid = $1`, [ticketId]);
                              
    return query['rows'].length != 0
}

export async function checkUserIsReceiver(uId: string, ticketId: string) {
    const checkUserIsReceiverDBClient = createClient();
    const query = await checkUserIsReceiverDBClient.query(`SELECT ticketid FROM tickettrade
                                                        WHERE uid = $1 AND ticketid = $2`, [uId, ticketId]);
                       
    return query['rows'].length != 0
}


