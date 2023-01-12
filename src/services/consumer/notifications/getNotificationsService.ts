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
    const query = await getNotificationsDBClient.query(`SELECT * FROM Notifications WHERE receiverid=$1`, [uId])

    const data = query["rows"]

    await getNotificationsDBClient.end()

    return { data, status: 200 }
  }
}