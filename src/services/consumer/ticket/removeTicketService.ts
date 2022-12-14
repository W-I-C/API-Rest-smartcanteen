/**
 * @module removeTicketService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { getDeliveredStatusId, getNotStartedStatusId } from "../../../helpers/dbHelpers";
import { getUserCampus } from "../../../validations/consumer/trades/seeTradesValidation";

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

        if (ticket['uid'] != uId) {
            throw new Error('Not your Order!')
        }

        if (ticket['stateid'] != (await getNotStartedStatusId()) && ticket['stateid'] != (await getDeliveredStatusId())) {
            throw new Error('Order Already in preperation!')
        }

        await removeTicketDBClient.query(`UPDATE tickets SET isdeleted=$1 WHERE ticketid=$2`, [true, ticketId])


        const campusId = await getUserCampus(uId)
        const query = await removeTicketDBClient.query(`SELECT bar.name as barname,tickets.ticketid,users.name as ownername,states.name as statename,tickets.cartid,tickets.emissiondate,tickets.pickuptime,tickets.ticketamount, tickets.total,tickets.nencomenda, tickets.isfree
                                                            FROM campus
                                                            JOIN bar on bar.campusid = campus.campusid
                                                            JOIN tickets on tickets.barid = bar.barid
                                                            JOIN users on users.uid = tickets.uid
                                                            JOIN states ON tickets.stateid = states.stateid
                                                            WHERE campus.campusid=$1 AND tickets.uid = $2 AND tickets.isdeleted = $3`, [campusId, uId, false])

        const data = query["rows"]

        await removeTicketDBClient.end()

        return { data: data, status: 200 }
    }
}