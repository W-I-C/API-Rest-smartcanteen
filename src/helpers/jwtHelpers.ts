import { sign } from "jsonwebtoken"
import { createClient } from "../config/db";

export function createSessionToken(uid: string, role: string) {
  // get jwt secret key
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  // dados a carregar no token
  const data = { role: role, time: Date() }

  const token = sign(data, jwtSecretKey, { subject: uid, expiresIn: '15m' })

  return token
}

export async function createRefreshToken(uid: string) {
  // get jwt secret key
  let jwtRefreshKey = process.env.JWT_REFRESH_TOKEN_KEY;

  const token = sign({}, jwtRefreshKey, { subject: uid, expiresIn: '1y' })

  
  const refreshTokenDBClient = createClient();
  
  const insertRefreshTokenQuery = await refreshTokenDBClient.query(`UPDATE users SET "refreshtoken" = $1 WHERE uid = $2`, [token, uid])

  await refreshTokenDBClient.end()
}
