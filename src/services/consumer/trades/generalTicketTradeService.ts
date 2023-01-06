/**
 * @module generalTicketTradeService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";

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

    const renameTicketTradeDBClient = createClient();
    const getTicketQuery = await renameTicketTradeDBClient.query(`SELECT * FROM tickets WHERE ticketid = $1 AND isdeleted = $2`, [ticketId, false]);
    const getTicketTrades = await renameTicketTradeDBClient.query(`SELECT * FROM tickettrade WHERE ticketid = $1 AND receptordecision = $2`, [ticketId, 1]);

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

    await renameTicketTradeDBClient.query(`UPDATE tickets SET isTrading=$1 WHERE ticketid=$2`, [true, ticketId])
    return { data: { msg: 'Trade exposed successfully' }, status: 200 }
  }
}