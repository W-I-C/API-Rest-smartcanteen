/**
 * @module generalTicketTradeService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { getNotStartedStatusId, getUserName, getUserRole } from "../../../helpers/dbHelpers";

/**
 * Class responsible for the service that serves to expose ticket for trading
 */
export class GeneralTicketTradeService {
  /**
   * Method that allows the authenticated user to expose his order for trading
   * 
   * @param uId authenticated user id
   * @param ticketId id of the order
   */
  async execute(uId: string, ticketId: string) {

    const directTicketTradeDBClient = createClient();
    const getTicketQuery = await directTicketTradeDBClient.query(`SELECT * FROM tickets WHERE ticketid = $1 AND isdeleted = $2`, [ticketId, false]);
    const getTicketTrades = await directTicketTradeDBClient.query(`SELECT * FROM tickettrade WHERE ticketid = $1 AND receptordecision = $2`, [ticketId, 1]);


    const userName = await getUserName(uId)
    if (userName === undefined) {
      throw new Error('User does not exist')
    }

    if (getTicketQuery['rows'].length == 0) {
      throw new Error('Order does not exist!')
    }

    const ticket = getTicketQuery.rows[0]

    if (ticket['istrading']) {
      throw new Error('Order already trading!')
    }


    if (getTicketTrades['rows'].length != 0) {
      const trade = getTicketTrades['rows'][0]
      if (trade['uid'] != uId) {
        throw new Error('Not your Order!')
      }
    } else if (ticket['uid'] != uId) {
      throw new Error('Not your Order!')
    }

    await directTicketTradeDBClient.query(`UPDATE tickets SET isTrading=$1 WHERE ticketid=$2`, [true, ticketId])
    return { data: { msg: 'Trade exposed successfully' }, status: 200 }
  }
}