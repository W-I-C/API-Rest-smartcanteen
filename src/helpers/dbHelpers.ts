import { createClient } from "../config/db";

export async function getRefreshToken(uid: string) {
  // verificar se o token de refresh expirou
  const getRefreshTokenDBClient = createClient();
  const query = await getRefreshTokenDBClient.query(`SELECT "refreshtoken" FROM users 
                                              WHERE uid = $1
                                              `, [uid])
  return query['rows'][0]['refreshtoken']
}
