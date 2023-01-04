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
        
        // TODO: se receptorDecisison já estiver a 1 pode se editar para 0?
        // TODO: se receptorDecisison já estiver a 1 pode se editar? o isConfirmed é sempre true?
        if(tradeExists && userIsReceiver) {
            await acceptTradeDBClient.query(`UPDATE tickettrade
                                                        SET isconfirmed = $1, confirmationdate = $2, receptordecision = $3   
                                                        WHERE uid = $4 AND ticketid = $5`, [isConfirmed, confirmationDate, receptorDecision, uId, ticketId])

            const query = await acceptTradeDBClient.query(`SELECT isconfirmed, confirmationdate, receptordecision
                                                    FROM tickettrade 
                                                    WHERE uid = $1 AND ticketid = $2`, [uId, ticketId])
            
            const data = query["rows"][0]

            return { data, status: 200 }
        }
        else {
            return { msg: "Invalid Data", status: 404 }
        }  

        // TODO: notificação a avisar o utilizador que propos a troca (que detem o ticket) rque a troca foi aceite ou não pelo recetor
    }
}