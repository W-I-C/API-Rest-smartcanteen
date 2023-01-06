/**
 * @module seeTradesService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { getCampusBar } from "../../../validations/both/profile/editProfileValidation";
import { getUserCampus } from "../../../validations/consumer/trades/seeTradesValidation";

/**
 * Class responsible for the service that allows you to see the available trades
 */
export class SeeTradesService {
     /**
     * Method that allows to see all the tickets that are available to trade in the campus of the user
     * @param uId authenticated user id
     */
    async execute(uId: string) {
        const selectTicket = createClient();

        const campusUser = getUserCampus(uId)
        
        const verifyUser = await selectTicket.query('SELECT * from tickets WHERE istrading=$1 AND ispickedup=$2 AND ', [true, false])

        const data = verifyUser["rows"]

        return { data, status: 200 }
    }
}