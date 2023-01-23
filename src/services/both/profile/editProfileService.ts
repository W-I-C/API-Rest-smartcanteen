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
    async execute({ uId, preferredCampus, preferredBar }: IEditProfileService) {
        const editProfileDBClient = createClient();

        const editProfileVallidator = new EditProfileValidator();
        const resp = await editProfileVallidator.validate(preferredCampus, preferredBar);

        const campusBar = await getCampusBar(preferredBar)

        if (resp) {
            const query = await editProfileDBClient.query(`UPDATE users
                                                        SET preferredcampus = $1, preferredBar = $2   
                                                        WHERE users.uid = $3`, [preferredCampus, preferredBar, uId])

            const query_edited = await editProfileDBClient.query(`SELECT preferredcampus, preferredBar
                                                                FROM users
                                                                WHERE users.uid = $1`, [uId])

            const data = query_edited["rows"][0]

            await editProfileDBClient.end()

            return { data, status: 200 }
        }
        else {

            await editProfileDBClient.end()

            return { msg: "Invalid Data", status: 500 }
        }
    }
}
