
require('dotenv').config();
import { createClient } from "../../../config/db";
import { getTradeTicketId, getUserName } from "../../../helpers/dbHelpers";
import { sendNotification } from "../../../helpers/requestsHelpers";

export class AcceptTradeGeneralService {

    async execute(uId: string, generalTradeId: string) {

        const createTradeDBClient = createClient();

        const tradeDate = new Date()

        const userName = await getUserName(uId)

        const ticketId = await getTradeTicketId(generalTradeId)

        const getPreviousOwner = await createTradeDBClient.query(`SELECT uid FROM tickets 
                                        WHERE ticketid = $1`, [ticketId])

        const previousOwner = getPreviousOwner["rows"][0]["uid"]


        await createTradeDBClient.query(`UPDATE generaltrades SET uid = $1, tradedate = $2
                                        WHERE generaltradeid = $3`, [uId, tradeDate, generalTradeId])


        await createTradeDBClient.query(`UPDATE tickets SET uId = $1, istrading = $2
                                        WHERE ticketid = $3`, [uId, false, ticketId])

        const description = `User ${userName} traded with you`

        await createTradeDBClient.query(`INSERT INTO notifications (date, receiverid, senderid, description)
                                        VALUES ($1, $2, $3, $4)`, [tradeDate, previousOwner, uId, description])


        const name = await getUserName(uId)
        await sendNotification(previousOwner, `User ${name} traded with you`, `General Trade`)

        await createTradeDBClient.end()

        return { msg: "Success", status: 200 }
    }
}