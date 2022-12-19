import { getRefreshToken } from "../../../helpers/dbHelpers"
import { createSessionToken } from "../../../helpers/jwtHelpers"
import { decode, verify } from "jsonwebtoken"

export class NewSessionTokenService {
  async execute(uid: string, role: string) {
    const refreshToken = await getRefreshToken(uid)
    const decodedRefreshToken = decode(refreshToken)
    const refExpTime = decodedRefreshToken['exp']

    // verificar se o refresh token está expirado
    if (Date.now() >= (refExpTime * 1000)) {
      return { status: 401, data: { Error: "Unauthorized Request" } }

    } else {
      try {
        // verificar se o refresh token é valido
        const verified = verify(refreshToken, process.env.JWT_REFRESH_TOKEN_KEY)
        if (verified) {
          const newSessionToken = createSessionToken(uid, role)
          return { status: 200, data: { token: newSessionToken } }
        }
        else {
          return { status: 401, data: { Error: "Unauthorized Request" } }
        }
      } catch (e) {
        return { status: 401, data: { Error: "Unauthorized Request" } }
      }
    }

  }
}
