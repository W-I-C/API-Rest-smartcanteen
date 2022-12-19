import { createClient } from "../../../config/db";
import { createRefreshToken, createSessionToken } from "../../../helpers/jwtHelpers";

export class LoginService {
  async execute(email: string, password: string) {

    // obter dados do user
    const loginDBClient = createClient();
    const query = await loginDBClient.query(`SELECT uid,userrole.name FROM users 
                                              JOIN userrole On userrole.roleid = users.roleid
                                              WHERE email=$1 AND password = $2
                                              `, [email, password])

    // dados a carregar no token
    const role = query['rows'][0]['name']
    const uid = query['rows'][0]['uid']


    const sessionToken = createSessionToken(uid, role)

    await createRefreshToken(uid)
    return sessionToken
  }
}