
require('dotenv').config();
import { createClient } from "../../../config/db";

export class RegisterDeviceTokenService {

  async execute(uId: string, deviceToken: string) {

    const registerDeviceDBClient = createClient();

    await registerDeviceDBClient.query(`INSERT INTO usersdevices (uid, devicetoken)
                                        VALUES ($1, $2)`, [uId, deviceToken])

    await registerDeviceDBClient.end()

    return { msg: "Success", status: 200 }
  }
}