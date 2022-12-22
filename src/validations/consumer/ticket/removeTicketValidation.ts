import { createClient } from "../../../config/db";

export async function checkTicketExists(ticketId: string) {
    const checkTicketExistsDBClient = createClient();
    const query = await checkTicketExistsDBClient.query(`SELECT ticketid FROM tickets
                                                        WHERE ticketid = $1`, [ticketId]);

                                                        
    return query['rows'].length != 0
}