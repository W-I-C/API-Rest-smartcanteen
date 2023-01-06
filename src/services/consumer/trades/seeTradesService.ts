/**
 * @module seeTradesService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";

/**
 * Class responsible for the service that allows you to see the available trades
 */
export class SeeTradesService {
    /**
    * Method that allows to see all the tickets that are available to trade in the campus of the user
    * @param uId authenticated user id
    */
    async execute(uId: string, campusid: string) {
        const selectTicket = createClient();

        const verifyUser = await selectTicket.query(`SELECT * FROM campus
                                                        JOIN bar on bar.campusid=campus.campusid
                                                        JOIN tickets on tickets.barid=bar.barid
                                                        LEFT JOIN tickettrade on tickets.ticketid=tickettrade.ticketid
                                                        WHERE campus.campusid=$1 
                                                        AND tickets.istrading = true 
                                                        AND tickets.isdirecttrade=false
                                                        AND tickettrade.receptordecision is NULL`, [campusid])

        const data = verifyUser["rows"]

        return { data, status: 200 }
    }
}