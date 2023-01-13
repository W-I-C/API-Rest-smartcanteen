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
  async execute(uId: string, ticketId: string, isFree: boolean, paymentMethodId: string) {

    const renameTicketTradeDBClient = createClient();
    const getTicketQuery = await renameTicketTradeDBClient.query(`SELECT * FROM tickets WHERE ticketid = $1 AND isdeleted = $2`, [ticketId, false]);
    const getTicketTrades = await renameTicketTradeDBClient.query(`SELECT * FROM tickettrade WHERE ticketid = $1 AND receptordecision = $2`, [ticketId, 1]);

    const getPreviousOwner = await renameTicketTradeDBClient.query(`SELECT uid FROM tickets 
                                        WHERE ticketid = $1`, [ticketId])

    const previousOwner = getPreviousOwner["rows"][0]["uid"]

    if (getTicketQuery['rows'].length == 0) {
      throw new Error('Order does not exist!')
    }

    const ticket = getTicketQuery.rows[0]

    if (ticket['istrading']) {
      throw new Error('Order already trading!')
    }

    if (ticket['uid'] != uId) {
      throw new Error('Not your Order!')
    }

    await renameTicketTradeDBClient.query(`UPDATE tickets SET isTrading=$1, isfree=$2 WHERE ticketid=$3`, [true, isFree, ticketId])

    await renameTicketTradeDBClient.query(`INSERT INTO generaltrades(ticketid, previousowner, paymentmethodid) VALUES ($1,$2,$3)`, [ticketId, previousOwner, paymentMethodId])

    await renameTicketTradeDBClient.end()

    return { data: 'Trade exposed successfully', status: 200 }
  }
}