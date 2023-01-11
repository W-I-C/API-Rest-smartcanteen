/**
 * @module seeTicketsHistoryService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { getUserCampus } from "../../../validations/consumer/trades/seeTradesValidation";

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

        const campusId = await getUserCampus(uId)
        const query = await seeTicketsHistoryDBClient.query(`SELECT bar.name as barname,tickets.ticketid,users.name as ownername,states.name as statename,tickets.cartid,tickets.emissiondate,tickets.pickuptime,tickets.ticketamount, tickets.total,tickets.nencomenda, tickets.isfree
                                                                FROM campus
                                                                JOIN bar on bar.campusid = campus.campusid
                                                                JOIN tickets on tickets.barid = bar.barid
                                                                JOIN users on users.uid = tickets.uid
                                                                JOIN states ON tickets.stateid = states.stateid
                                                                WHERE campus.campusid=$1 AND tickets.uid = $2 AND tickets.isdeleted = $3`, [uId, campusId, false])

        const data = query["rows"]

        return { data, status: 200 }
    }
}