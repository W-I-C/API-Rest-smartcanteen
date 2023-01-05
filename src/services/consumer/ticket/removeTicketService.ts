/**
 * @module removeTicketService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { getNotStartedStatusId } from "../../../helpers/dbHelpers";

/**
 * Class responsible for the service that serves to remove one order of the authenticated user
 */
export class RemoveTicketService {
    /**
     * Method that allows the authenticated user to remove a order
     * 
     * @param uId authenticated user id
     * @param ticketId id of the order to be removed from favorites
     */
    async execute(uId: string, ticketId: string) {

        const removeTicketDBClient = createClient();
        const getTicketQuery = await removeTicketDBClient.query(`SELECT * FROM tickets WHERE ticketid = $1 AND isDeleted = $2`, [ticketId, false]);
        const getTicketTrades = await removeTicketDBClient.query(`SELECT * FROM tickettrade 
                                                                    WHERE ticketid = $1 AND receptordecision = $2`, [ticketId, 1]);

        if (getTicketQuery['rows'].length == 0) {
            throw new Error('Order does not exist!')
        }

        const ticket = getTicketQuery.rows[0]

        if (getTicketTrades['rows'].length != 0) {
            const trade = getTicketTrades['rows'][0]
            if (trade['uid'] != uId) {
                throw new Error('Not your Order!')
            }
        } else if (ticket['uid'] != uId) {
            throw new Error('Not your Order!')
        }

        if (ticket['stateid'] != (await getNotStartedStatusId())) {
            throw new Error('Order Already in preperation!')
        }

        await removeTicketDBClient.query(`UPDATE tickets SET isdeleted=$1 WHERE ticketid=$2`, [true, ticketId])

        return { data: { msg: 'Order removed sucessfuly' }, status: 200 }
    }
}