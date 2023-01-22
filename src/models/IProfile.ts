/**
 * @param uId authenticated user id
 * @param preferredCampus user's preferred campus
 * @param preferredBar user's preferred bar
 */
export interface IEditProfileService {
    uId: string,
    preferredCampus: string
    preferredBar: string
}