/**
 * @param uId authenticated user id
 * @param preferredCampus user's preferred campus
 * @param preferredBar user's preferred bar
 * @param imgurl url of the user profile image
 */
export interface IEditProfileService {
    uId: string,
    preferredCampus: string
    preferredBar: string,
    imgUrl: string
}