import { createClient } from "../../../config/db";


export class LogoutService {
  async execute(uid: string) {

    // obter dados do user
    const loginDBClient = createClient();
    const query = await loginDBClient.query(`UPDATE users SET "refreshtoken"='' WHERE uid = $1
                                              `, [uid])
    // TODO: Adicionar o token de sessão à black list
  }
}