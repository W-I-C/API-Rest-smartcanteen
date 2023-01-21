
/**
 * @module loginService
 */
import { createClient } from "../../../config/db";
import { createRefreshToken, createSessionToken } from "../../../helpers/jwtHelpers";
import { compare, hash } from "bcrypt"

/**
 * class responsible for logging in
 */
export class LoginService {
  /**
   * Method that allows you to logout
   * @param email email
   * @param password password
  */
  async execute(email: string, password: string) {
    // obter dados do user
    const loginDBClient = createClient();
    const query = await loginDBClient.query(`SELECT uid,userrole.name, password FROM users 
                                              JOIN userrole On userrole.roleid = users.roleid
                                              WHERE email=$1 
                                              `, [email])

    const querypassword = query["rows"][0]["password"]

    const comp = await compare(password, querypassword)
    if (!comp) {
      throw new Error("authentication error")
    }

    // dados a carregar no token
    if (query['rowCount'] == 1) {
      const role = query['rows'][0]['name']
      const uid = query['rows'][0]['uid']
      const sessionToken = createSessionToken(uid, role)
      await createRefreshToken(uid)

      await loginDBClient.end()

      return { status: 200, data: { token: sessionToken, role: role, uid: uid } }
    } else {

      await loginDBClient.end()

      return { status: 401, data: { msg: 'Wrong Credentials!' } }
    }
  }
}
