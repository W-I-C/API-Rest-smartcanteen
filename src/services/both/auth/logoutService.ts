
/**
 * @module logoutService
 */
import { createClient } from "../../../config/db";

/**
 * class responsible for logging out
 */
export class LogoutService {
  /**
 * Method that allows you to logout
 * @param uid role id
 * @param sessionToken psession token
 */
  async execute(uid: string, sessionToken: string) {

    // obter dados do user
    const logoutDBClient = createClient();
    const query = await logoutDBClient.query(`UPDATE users SET "refreshtoken"='' WHERE uid = $1
                                              `, [uid])
    await logoutDBClient.query(`INSERT INTO blacklist(uid, token) VALUES($1,$2)`, [uid, sessionToken])

    await logoutDBClient.end()

    return { msg: 'Logout Successful' }
  }
}