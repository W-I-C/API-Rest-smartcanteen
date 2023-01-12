/**
 * @module seeUndeliveredTicketsService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { getUserCampus } from "../../../validations/consumer/trades/seeTradesValidation";
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

        const campusId = await getUserCampus(uId)
        const barId = await getEmployeeBar(uId);

        const stateId = "5669f7ec-4991-4dee-a1f4-9b944580ac33"

        const query = await seeUndeliveredTicketsDBClient.query(`SELECT bar.name as barname,tickets.ticketid,users.name as ownername,states.name as statename,tickets.cartid,tickets.emissiondate,tickets.pickuptime,tickets.ticketamount, tickets.total,tickets.nencomenda, tickets.isfree
                                                                    FROM campus
                                                                    JOIN bar on bar.campusid = campus.campusid
                                                                    JOIN tickets on tickets.barid = bar.barid
                                                                    JOIN users on users.uid = tickets.uid
                                                                    JOIN states ON tickets.stateid = states.stateid
                                                                    WHERE campus.campusid=$1 AND tickets.barid = $2 AND tickets.isdeleted = $3 AND tickets.ispickedup = $4 AND tickets.stateid != $5`, [campusId, barId, false, false, stateId])

        await seeUndeliveredTicketsDBClient.end()
        
        const data = query["rows"]

        return { data, status: 200 }
    }
}