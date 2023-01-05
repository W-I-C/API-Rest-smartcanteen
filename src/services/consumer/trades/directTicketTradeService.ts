/**
 * @module directTicketTradeService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { getNotStartedStatusId, getUserName, getUserRole } from "../../../helpers/dbHelpers";

/**
 * Class responsible for the service that serves to make a direct trade
 */
export class DirectTicketTradeService {
  /**
   * Method that allows the authenticated user to make a direct trade
   * 
   * @param uId authenticated user id
   * @param receiverid id of the user that is going to receive the trade proposal
   * @param ticketId id of the order
   * @param receiverid id of the user that the trade is going to go
   */
  async execute(uId: string, receiverid: string, ticketId: string) {

    const directTicketTradeDBClient = createClient();
    const getTicketQuery = await directTicketTradeDBClient.query(`SELECT * FROM tickets WHERE ticketid = $1 AND isdeleted = $2`, [ticketId, false]);
    const getTicketTrades = await directTicketTradeDBClient.query(`SELECT * FROM tickettrade 
                                                                    WHERE ticketid = $1 AND receptordecision = $2`, [ticketId, 1]);



    const userName = await getUserName(uId)
    if (userName === undefined) {
      throw new Error('User does not exist')
    }
    const receiverRole = await getUserRole(receiverid)
    if (receiverRole != 'consumer') {
      throw new Error('Can only trade with another consumer')
    }

    if (getTicketQuery['rows'].length == 0) {
      throw new Error('Order does not exist!')
    }

    const ticket = getTicketQuery.rows[0]

    if (getTicketTrades['rows'].length != 0) {
      const trade = getTicketTrades['rows'][0]
      if (trade['uid'] != uId) {
        throw new Error('Not your Order!')
      }
    } else if (ticket['uid'] != uId) {
      throw new Error('Not your Order!')
    }


    const getTradesTicketToReceiver = await directTicketTradeDBClient.query(`SELECT * FROM tickettrade 
    WHERE ticketid = $1 AND uid = $2`, [ticketId, receiverid]);

    if (getTradesTicketToReceiver['rows'].length != 0) {
      throw new Error('Trade proposal to this user already sent!')
    }

    const description = `${userName} sent you a trade proposal`

    await directTicketTradeDBClient.query(`UPDATE tickets SET isTrading=$1 WHERE ticketid=$2`, [true, ticketId])
    const date = new Date()
    await directTicketTradeDBClient.query(`INSERT INTO notifications(date,receiverid, senderid,description,istradeproposal) VALUES ($1,$2,$3,$4,$5)`, [date, receiverid, uId, description, true])
    await directTicketTradeDBClient.query(`INSERT INTO tickettrade(ticketid,uid,proposaldate) VALUES ($1,$2,$3)`, [ticketId, receiverid, date])
    return { data: { msg: 'Trade proposal done successfully' }, status: 200 }
  }
}