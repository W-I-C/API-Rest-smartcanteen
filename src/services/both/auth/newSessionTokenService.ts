
/**
 * @module newSessionTokenService
 */
import { getRefreshToken } from "../../../helpers/dbHelpers"
import { createSessionToken } from "../../../helpers/jwtHelpers"
import { decode, verify } from "jsonwebtoken"


/**
 * class responsible for getting new session token
 */
export class NewSessionTokenService {
  /**
   * Method that allows you to get a new session token
   * @param uid role id
   * @param role preferred campus
   */
  async execute(uid: string, role: string) {
    const refreshToken = await getRefreshToken(uid)
    const decodedRefreshToken = decode(refreshToken)
    const refExpTime = decodedRefreshToken['exp']


    if (Date.now() >= (refExpTime * 1000)) {
      return { status: 401, data: { Error: "Unauthorized Request" } }

    } else {
      try {

        const verified = verify(refreshToken, process.env.JWT_REFRESH_TOKEN_KEY)
        if (verified) {
          const newSessionToken = createSessionToken(uid, role)
          return { status: 200, data: { token: newSessionToken, role: role, uid: uid } }
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
