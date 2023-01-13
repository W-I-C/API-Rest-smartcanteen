/**
 * @module generalTicketTradeService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { getDeliveredStatusId, getUserName } from "../../../helpers/dbHelpers";
import { getUserCampus } from "../../../validations/consumer/trades/seeTradesValidation";

/**
 * Class responsible for the service that serves to cancel trading for a ticket 
 */
export class CancelTradingService {
  /**
   * Method that allows the authenticated user to cancel is ticket trading
   * 
   * @param uId authenticated user id
   * @param ticketId id of the order
   */
  async execute(uId: string, ticketId: string) {

    const cancelTicketTradeDBClient = createClient();
    const getTicketQuery = await cancelTicketTradeDBClient.query(`SELECT * FROM tickets WHERE ticketid = $1 AND isdeleted = $2`, [ticketId, false]);
    const getTicketTrades = await cancelTicketTradeDBClient.query(`SELECT * FROM tickettrade WHERE ticketid = $1 AND receptordecision = $2`, [ticketId, 1]);

    const userName = await getUserName(uId)

    if (getTicketQuery['rows'].length == 0) {
      throw new Error('Order does not exist!')
    }

    const ticket = getTicketQuery.rows[0]

    if (!ticket['istrading']) {
      throw new Error('Order not trading!')
    }

    if (ticket['uid'] != uId) {
      throw new Error('Not your Order!')
    }

    if (ticket['stateid'] === (await getDeliveredStatusId())) {
      throw new Error('Cannot trade an order that is already delivered')
    }

    await cancelTicketTradeDBClient.query(`UPDATE tickets SET istrading=$1, isdirecttrade=$2 WHERE ticketid=$3`, [false, false, ticketId])
    await cancelTicketTradeDBClient.query(`UPDATE tickettrade SET isDeleted=$1 WHERE ticketid = $2`, [true, ticketId])

    if (ticket['isdirecttrade']) {
      const users = await cancelTicketTradeDBClient.query(`SELECT * FROM tickettrade WHERE ticketid=$1 AND receptordecision is NULL`, [ticketId])
      const date = new Date()
      const description = `${userName} canceled the trade proposal`
      users['rows'].forEach(async function (user) {
        await cancelTicketTradeDBClient.query(`INSERT INTO notifications(date,receiverid, senderid,description,istradeproposal) VALUES ($1,$2,$3,$4,$5)`, [date, user['uid'], uId, description, false])
      });
    }

    const campusId = await getUserCampus(uId)

    // mostrar também as rotas gerais

    const verifyUser = await cancelTicketTradeDBClient.query(
      `SELECT tickets.ticketid, tickets.cartid, tickets.emissiondate, tickets.pickuptime, tickets.isfree, tickets.nencomenda, tickets.ticketamount, tickets.total, NULL AS receptordecision, paymentmethods.name AS paymentmethod,  states.name AS statename, ticketowner.name AS ownername, tradereceiver.name AS receivername, true AS isgeneraltrade, NULL AS generaltradeid
      FROM tickettrade 
      JOIN tickets ON tickettrade.ticketid = tickets.ticketid
      JOIN bar ON bar.barid = tickets.barid
      JOIN campus ON campus.campusid = bar.campusid
      JOIN states ON tickets.stateid = states.stateid
      JOIN users ticketowner ON tickets.uid = ticketowner.uid
      JOIN users tradereceiver ON tickettrade.uid = tradereceiver.uid
      JOIN paymentmethods ON tickettrade.paymentmethodid = paymentmethods.methodid
      WHERE tickets.uid = $1 
      AND tickettrade.isdeleted = $2 AND (tickettrade.receptordecision <> 1 OR tickettrade.receptordecision is NULL)
      UNION
      SELECT tickets.ticketid, tickets.cartid, tickets.emissiondate, tickets.pickuptime, tickets.isfree, tickets.nencomenda, tickets.ticketamount, tickets.total, NULL AS receptordecision, paymentmethods.name AS paymentmethod,  states.name AS statename, ticketowner.name AS ownername, tradereceiver.name AS receivername, true AS isgeneraltrade, generaltrades.generaltradeid
      FROM generaltrades 
      JOIN tickets ON generaltrades.ticketid = tickets.ticketid
      JOIN bar ON bar.barid = tickets.barid
      JOIN campus ON campus.campusid = bar.campusid
      JOIN states ON tickets.stateid = states.stateid
      JOIN users ticketowner ON tickets.uid = ticketowner.uid
      LEFT JOIN users tradereceiver ON generaltrades.uid = tradereceiver.uid
      LEFT JOIN paymentmethods ON generaltrades.paymentmethodid = paymentmethods.methodid
      WHERE tickets.uid = $1 
      AND generaltrades.isdeleted = $2`, [uId, false])

    const data = verifyUser["rows"]

    await cancelTicketTradeDBClient.end()

    return { data: data, status: 200 }
  }
}