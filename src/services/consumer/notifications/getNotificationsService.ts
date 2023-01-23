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
    const query = await getNotificationsDBClient.query(`SELECT notifications.notiid, notifications.receiverid, notifications.senderid, notifications.description, notifications.isseen, notifications.istradeproposal, notifications.date, users.name
                                                      FROM notifications 
                                                      JOIN users ON notifications.senderid = users.uid
                                                      WHERE receiverid = $1`, [uId])

    const data = query["rows"]

    await getNotificationsDBClient.end()

    return { data, status: 200 }
  }
}