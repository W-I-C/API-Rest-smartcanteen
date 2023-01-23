import axios from "axios";
import { createClient } from "../config/db";

export async function sendNotification(uid: String, body: String, title: String) {
  const sendNotificationDBClient = createClient();
  const query = await sendNotificationDBClient.query(`SELECT * FROM usersdevices WHERE uid=$1`, [uid])

  query['rows'].forEach(async function (item) {
    const deviceToken = item['devicetoken']
    await axios.post('https://fcm.googleapis.com/fcm/send',
      {
        "to": deviceToken,
        "notification": {
          "body": body,
          "OrganizationId": "2",
          "content_available": true,
          "priority": "high",
          "subtitle": "SmartCanteen",
          "title": title
        },
        "data": {
          "priority": "high",
          "content_available": true,
          "bodyText": body,
          "organization": "SmartCanteen"
        }
      }, {
      headers: {
        'Authorization': `key=${process.env.FCM_KEY}`,
        'Content-Type': `application/json`
      }
    }
    )
      .then(response => {
        console.log(response.data.url);
        console.log(response.data.explanation);
      })
      .catch(error => {
        console.log(error);
      });
  })
  sendNotificationDBClient.end()
}