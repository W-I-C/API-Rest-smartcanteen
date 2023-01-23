/**
 * @module getNotificationsService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";

/**
 * Class responsible for the service that serves to get all the notifications of the authenticated user
 */
export class GetNotificiationsService {
  /**
   * Method that allows the authenticated user to get all his notifications
   * 
   * @param uId authenticated user id
   */
  async execute(uId: string) {

    const getNotificationsDBClient = createClient();
    const query = await getNotificationsDBClient.query(`SELECT notifications.notiid, notifications.receiverid, notifications.senderid, notifications.description, notifications.isseen, notifications.istradeproposal, notifications.date, notifications.tradeid, users.name, tickets.isfree, tickets.total, tickets.ticketid
                                                      FROM notifications 
                                                      JOIN users ON notifications.senderid = users.uid
                                                      LEFT JOIN tickettrade ON tickettrade.tradeid = notifications.tradeid
                                                      LEFT JOIN tickets ON tickets.ticketid = tickettrade.ticketid
                                                      WHERE receiverid = $1
                                                      ORDER BY notifications.date DESC`, [uId])

    const data = query["rows"]

    await getNotificationsDBClient.end()

    return { data, status: 200 }
  }
}