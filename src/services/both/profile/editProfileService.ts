/**
 * @module editProfileService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { IEditProfileService } from "../../../models/IProfile";
import { EditProfileValidator, getCampusBar } from "../../../validations/both/profile/editProfileValidation";

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

        const campusBar = await getCampusBar(preferredBar)

        if(resp && campusBar == preferredCampus) {
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