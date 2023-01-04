import { createClient } from "../../../config/db";


export class LogoutService {
  async execute(uid: string, sessionToken: string) {

    // obter dados do user
    const logoutDBClient = createClient();
    const query = await logoutDBClient.query(`UPDATE users SET "refreshtoken"='' WHERE uid = $1
                                              `, [uid])
    await logoutDBClient.query(`INSERT INTO blacklist(uid, token) VALUES($1,$2)`, [uid, sessionToken])

    return { msg: 'Logout Successful' }
  }
}