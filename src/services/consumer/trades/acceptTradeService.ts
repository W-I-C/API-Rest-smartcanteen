/**
 * @module acceptTradeService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { getUserName } from "../../../helpers/dbHelpers";
import { sendNotification } from "../../../helpers/requestsHelpers";
import { IAcceptTradeService } from "../../../models/ITrade";
import { checkTradeExists, checkUserIsReceiver } from "../../../validations/consumer/trades/acceptTradeValidation";

/**
 * Class responsible for the service that serves to accept the trade
 */
export class AcceptTradeService {
    /**
     * Method that allows editing the data regarding the acceptance of the trade
     */
    async execute({ uId, ticketId, receptorDecision }: IAcceptTradeService) {

        const acceptTradeDBClient = createClient();

        const tradeExists = await checkTradeExists(ticketId)
        const userIsReceiver = await checkUserIsReceiver(uId, ticketId)

        const isConfirmed = true;
        const confirmationDate = new Date();
        let description

        if (receptorDecision == 0) {
            description = "The trade proposal was refused"
        } else {
            description = "The trade proposal was accepted"
        }

        if (tradeExists && userIsReceiver) {

            const queryOwner = await acceptTradeDBClient.query(`SELECT uid FROM tickets WHERE ticketid = $1`, [ticketId])

            const ticketOwner = queryOwner["rows"][0]["uid"]

            await acceptTradeDBClient.query(`UPDATE tickettrade
                                            SET isconfirmed = $1, confirmationdate = $2, receptordecision = $3   
                                            WHERE uid = $4 AND ticketid = $5`, [isConfirmed, confirmationDate, receptorDecision, uId, ticketId])

            if (receptorDecision == 1) {
                await acceptTradeDBClient.query(`UPDATE tickets SET uId = $1, isdirecttrade = $2
                                        WHERE ticketid = $3`, [uId, false, ticketId])
            }

            const query = await acceptTradeDBClient.query(`SELECT isconfirmed, confirmationdate, receptordecision
                                                    FROM tickettrade 
                                                    WHERE uid = $1 AND ticketid = $2`, [uId, ticketId])

            await acceptTradeDBClient.query(`INSERT INTO notifications (date, receiverid, senderid, description)
                                            VALUES ($1, $2, $3, $4)`, [confirmationDate, ticketOwner, uId, description])


            const name = await getUserName(uId)
            await sendNotification(ticketOwner, `User ${name} accepted your trade`, `Direct Trade`)
            const data = query["rows"][0]
            await acceptTradeDBClient.end()

            return { data, status: 200 }
        }
        else {

            await acceptTradeDBClient.end()

            return { msg: "Invalid Data", status: 500 }
        }
    }
}