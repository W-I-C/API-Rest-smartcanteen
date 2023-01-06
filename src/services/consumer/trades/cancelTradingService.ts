/**
 * @module generalTicketTradeService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { getNotStartedStatusId, getUserName, getUserRole } from "../../../helpers/dbHelpers";

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

    if (getTicketTrades['rows'].length != 0) {
      const trade = getTicketTrades['rows'][0]
      if (trade['uid'] != uId) {
        throw new Error('Not your Order!')
      }
    } else if (ticket['uid'] != uId) {
      throw new Error('Not your Order!')
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

    return { data: { msg: 'Trade canceled successfully' }, status: 200 }
  }
}