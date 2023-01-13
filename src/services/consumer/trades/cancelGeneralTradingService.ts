
require('dotenv').config();
import { createClient } from "../../../config/db";
import { getDeliveredStatusId, getUserName } from "../../../helpers/dbHelpers";
import { getUserCampus } from "../../../validations/consumer/trades/seeTradesValidation";

export class CancelGeneralTradingService {
  async execute(uId: string, generalTradeId: string) {

    const cancelTicketTradeDBClient = createClient();

    const query = await cancelTicketTradeDBClient.query(`SELECT * FROM generaltrades WHERE previousowner = $1 AND generaltradeid = $2 AND uid is NOT NULL `, [uId, generalTradeId])

    const result = query["rows"]

    if(result.length >= 1){
        throw new Error("Unauthorized operation")
    }

    const ticket = await cancelTicketTradeDBClient.query(`SELECT ticketid FROM generaltrades WHERE generaltradeid = $1`, [generalTradeId])

    const ticketId = ticket["rows"][0]["ticketid"]

    await cancelTicketTradeDBClient.query(`UPDATE generaltrades SET isDeleted = $1
                                        WHERE generaltradeid = $2`, [true, generalTradeId])

    await cancelTicketTradeDBClient.query(`UPDATE tickets SET istrading = $1
                                        WHERE ticketid = $2`, [false, ticketId])

    const campusId = await getUserCampus(uId)

    const verifyUser = await cancelTicketTradeDBClient.query(
      `SELECT tickets.ticketid, tickets.cartid, tickets.emissiondate, tickets.pickuptime, tickets.isfree, tickets.nencomenda, tickets.ticketamount, tickets.total, NULL AS receptordecision, paymentmethods.name AS paymentmethod,  states.name AS statename, ticketowner.name AS ownername, tradereceiver.name AS receivername, true AS isgeneraltrade, generaltrades.generaltradeid
      FROM generaltrades 
      JOIN tickets ON generaltrades.ticketid = tickets.ticketid
      JOIN bar ON bar.barid = tickets.barid
      JOIN campus ON campus.campusid = bar.campusid
      JOIN states ON tickets.stateid = states.stateid
      JOIN users ticketowner ON tickets.uid = ticketowner.uid
      LEFT JOIN users tradereceiver ON generaltrades.uid = tradereceiver.uid
      LEFT JOIN paymentmethods ON generaltrades.paymentmethodid = paymentmethods.methodid
      WHERE tickets.uid = $1 AND campus.campusid = $2 AND Date(tickets.emissiondate) = CURRENT_DATE
      AND generaltrades.isdeleted = $3 AND generaltrades.uid is NULL AND generaltrades.tradedate is NULL`, [uId, campusId, false])

    const data = verifyUser["rows"]

    await cancelTicketTradeDBClient.end()

    return { data: data, status: 200 }
  }
}