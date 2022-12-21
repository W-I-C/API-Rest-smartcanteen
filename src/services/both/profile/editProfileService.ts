/**
 * @module editProfileService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { EditProfileValidator } from "../../../validations/both/profile/editProfileValidation";

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

/**
 * Class responsible for the service that serves to edit the profile of the authenticated user
 */
export class EditProfileService {
    /**
     * Method that allows editing the authenticated user's profile data
     */
    async execute({uId, preferredCampus, preferredBar, imgUrl}:IEditProfileService){
        const editProfileDBClient = createClient();

        const editProfileVallidator = new EditProfileValidator();
        const resp = await editProfileVallidator.validate(preferredCampus, preferredBar);

        if(resp) {
            const query = await editProfileDBClient.query(`UPDATE users
            SET preferredcampus = $1, preferredBar = $2, imgurl = $3   
            WHERE users.uid = $4`, [preferredCampus, preferredBar, imgUrl, uId])

            const data = query["rows"][0]

            return { data, status: 200 }
        }
        else {
            return { msg: "Invalid Data", status: 404 }
        }  
    }
}