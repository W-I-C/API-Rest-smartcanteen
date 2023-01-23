/**
 * @module directTicketTradeService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { getUserId, getUserName, getUserRole } from "../../../helpers/dbHelpers";
import { sendNotification } from "../../../helpers/requestsHelpers";

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
   * @param receiverEmail id of the user that the trade is going to go
   */
  async execute(uId: string, receiverEmail: string, ticketId: string, isFree: boolean, paymentMethodId: string) {

    const directTicketTradeDBClient = createClient();
    const getTicketQuery = await directTicketTradeDBClient.query(`SELECT * FROM tickets WHERE ticketid = $1 AND isdeleted = $2`, [ticketId, false]);
    const getTicketTrades = await directTicketTradeDBClient.query(`SELECT * FROM tickettrade 
                                                                    WHERE ticketid = $1 AND receptordecision = $2`, [ticketId, 1]);

    const userName = await getUserName(uId)
    if (userName === undefined) {
      throw new Error('User does not exist')
    }

    const receiverid = await getUserId(receiverEmail)
    if (receiverid === undefined) {
      throw new Error('Email does not exist')
    }

    const receiverRole = await getUserRole(receiverid)
    if (receiverRole != 'consumer') {
      throw new Error('Can only trade with another consumer')
    }

    if (getTicketQuery['rows'].length == 0) {
      throw new Error('Order does not exist!')
    }

    const ticket = getTicketQuery.rows[0]

    if (ticket['uid'] != uId) {
      throw new Error('Not your Order!')
    }

    const alreadyExistDirectTrade = await directTicketTradeDBClient.query(`SELECT istrading 
                                                                          FROM tickets
                                                                          WHERE uid = $1 AND ticketid = $2`, [uId, ticketId]);

    if (alreadyExistDirectTrade['rows'][0]["istrading"] == true) {
      throw new Error('You cant make another trade with this ticket')
    }

    const getTradesTicketToReceiver = await directTicketTradeDBClient.query(`SELECT * FROM tickettrade 
    WHERE ticketid = $1 AND uid = $2 AND isdeleted = $3`, [ticketId, receiverid, false]);

    if (getTradesTicketToReceiver['rows'].length != 0) {
      throw new Error('Trade proposal to this user already sent!')
    }

    const description = `${userName} sent you a trade proposal`


    await directTicketTradeDBClient.query(`UPDATE tickets SET istrading=$1, isdirecttrade=$2, isfree=$3 WHERE ticketid=$4`, [true, true, isFree, ticketId])
    const date = new Date()

    await directTicketTradeDBClient.query(`INSERT INTO tickettrade (ticketid,uid,proposaldate,previousowner,paymentmethodid) VALUES ($1,$2,$3,$4,$5)`, [ticketId, receiverid, date, uId, paymentMethodId])

    console.log(ticketId)
    console.log(receiverid)
    console.log(date)
    console.log(uId)
    console.log(paymentMethodId)
    const selectTicketTrade = await directTicketTradeDBClient.query(`SELECT tradeid FROM tickettrade WHERE ticketid = $1 AND uid = $2 AND proposaldate = $3 AND previousowner = $4 AND (paymentmethodid is NULL OR paymentmethodid = $5) AND isdeleted = $6`, [ticketId, receiverid, date, uId, paymentMethodId, false])

    const tradeId = selectTicketTrade["rows"][0]["tradeid"]
    console.log("123")
    console.log(tradeId)

    await directTicketTradeDBClient.query(`INSERT INTO notifications(date,receiverid,senderid,description,istradeproposal,tradeid) VALUES ($1,$2,$3,$4,$5,$6)`, [date, receiverid, uId, description, true, tradeId])
    const name = await getUserName(uId)
    await sendNotification(receiverid, `User ${name} wants to trade with you`, `Direct Trade`)

    await directTicketTradeDBClient.end()

    return { data: 'Trade proposal done successfully', status: 200 }
  }
}