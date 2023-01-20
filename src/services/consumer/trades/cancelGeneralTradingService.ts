
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
      `SELECT tickets.ticketid, tickets.cartid, tickets.emissiondate, tickets.pickuptime, tickets.isfree, tickets.nencomenda, tickets.ticketamount, tickets.total, tickettrade.receptordecision, paymentmethods.name AS paymentmethod, states.name AS statename, ticketowner.name AS ownername, tradereceiver.name AS receivername, false AS isgeneraltrade, NULL AS generaltradeid
      FROM tickettrade
      JOIN tickets ON tickettrade.ticketid = tickets.ticketid
      JOIN states ON tickets.stateid = states.stateid
      JOIN users ticketowner ON tickets.uid = ticketowner.uid
      JOIN users tradereceiver ON tickettrade.uid = tradereceiver.uid
      LEFT JOIN paymentmethods ON tickettrade.paymentmethodid = paymentmethods.methodid
      WHERE previousowner = $1 
      AND tickettrade.isdeleted = $2
      UNION
      SELECT tickets.ticketid, tickets.cartid, tickets.emissiondate, tickets.pickuptime, tickets.isfree, tickets.nencomenda, tickets.ticketamount, tickets.total, NULL AS receptordecision, paymentmethods.name AS paymentmethod,  states.name AS statename, ticketowner.name AS ownername, tradereceiver.name AS receivername, true AS isgeneraltrade, generaltrades.generaltradeid
      FROM generaltrades 
      JOIN tickets ON generaltrades.ticketid = tickets.ticketid
      JOIN states ON tickets.stateid = states.stateid
      JOIN users ticketowner ON tickets.uid = ticketowner.uid
      LEFT JOIN users tradereceiver ON generaltrades.uid = tradereceiver.uid
      LEFT JOIN paymentmethods ON generaltrades.paymentmethodid = paymentmethods.methodid
      WHERE previousowner = $1 
      AND generaltrades.isdeleted = $2`, [uId, false])

    const data = verifyUser["rows"]

    await cancelTicketTradeDBClient.end()

    return { data: data, status: 200 }
  }
}