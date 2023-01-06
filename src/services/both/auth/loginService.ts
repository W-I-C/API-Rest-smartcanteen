import { createClient } from "../../../config/db";
import { createRefreshToken, createSessionToken } from "../../../helpers/jwtHelpers";
import{compare} from "bcrypt"
export class LoginService {
  async execute(email: string, password: string) {
    // obter dados do user
    const loginDBClient = createClient();
    const query = await loginDBClient.query(`SELECT uid,userrole.name, password FROM users 
                                              JOIN userrole On userrole.roleid = users.roleid
                                              WHERE email=$1 
                                              `, [email])
                                              
    const querypassword=query["rows"][0]["password"]

    const comp= compare(password,querypassword)
    if(!comp){
      throw new Error("authentication error")
    }

    // dados a carregar no token
    if (query['rowCount'] == 1) {
      const role = query['rows'][0]['name']
      const uid = query['rows'][0]['uid']
      const sessionToken = createSessionToken(uid, role)
      await createRefreshToken(uid)
      return { status: 200, data: { token: sessionToken, role: role } }
    } else {
      return { status: 401, data: { msg: 'Wrong Credentials!' } }
    }
  }
}