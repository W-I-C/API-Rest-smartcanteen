
require('dotenv').config();
import { createClient } from "../../../config/db";
import { getUserName } from "../../../helpers/dbHelpers";
import { IAcceptTradeService } from "../../../models/ITrade";
import { checkTradeExists, checkUserIsReceiver } from "../../../validations/consumer/trades/acceptTradeValidation";

export class AcceptTradeGeneralService {

    async execute(uId: string, ticketId: string) {

        const createTradeDBClient = createClient();

        const tradeDate = new Date()

        const userName = await getUserName(uId)

        const getPreviousOwner = await createTradeDBClient.query(`SELECT uid FROM tickets 
                                        WHERE ticketid = $1`, [ticketId])

        const previousOwner = getPreviousOwner["rows"][0]["uid"]


        await createTradeDBClient.query(`INSERT INTO generaltrades (ticketid, uid, tradedate, previousowner)
                                        VALUES ($1, $2, $3, $4)`, [ticketId, uId, tradeDate, previousOwner])


        await createTradeDBClient.query(`UPDATE tickets SET uId = $1, istrading = $2
                                        WHERE ticketid = $3`, [uId, false, ticketId])

        const description = `User ${userName} traded with you`

        await createTradeDBClient.query(`INSERT INTO notifications (date, receiverid, senderid, description)
                                        VALUES ($1, $2, $3, $4)`, [tradeDate, previousOwner, uId, description])

        await createTradeDBClient.end()

        return { msg: "Success", status: 200 }
    }
}