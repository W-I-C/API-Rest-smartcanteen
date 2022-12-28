/**
 * @module AcceptTradeService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { IAcceptTradeService } from "../../../models/ITrade";
import { EditProfileValidator, getCampusBar } from "../../../validations/both/profile/editProfileValidation";
import { checkTradeExists, checkUserIsReceiver } from "../../../validations/consumer/trades/acceptTradeValidation";

/**
 * Class responsible for the service that serves to accept the trade
 */
export class AcceptTradeService {
    /**
     * Method that allows editing the data regarding the acceptance of the trade
     */
    async execute({uId, ticketId, receptorDecision}:IAcceptTradeService){

        const acceptTradeDBClient = createClient();

        const tradeExists = await checkTradeExists(ticketId)
        const userIsReceiver = await checkUserIsReceiver(uId, ticketId)

        const isConfirmed = true;
        const confirmationDate = new Date();

        if(tradeExists && userIsReceiver) {
            const query = await acceptTradeDBClient.query(`UPDATE tickettrade
                                                        SET isconfirmed = $1, confirmationdate = $2, receptordecision = $3   
                                                        WHERE uid = $4 AND ticketid = $5`, [isConfirmed, confirmationDate, receptorDecision, uId, ticketId])

            const data = query["rows"][0]

            return { data, status: 200 }
        }
        else {
            return { msg: "Invalid Data", status: 404 }
        }  
    }
}