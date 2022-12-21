/**
 * @module editProfileService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { checkCampusExists } from "../../../validations/both/profile/editProfileValidation";

/**
 * @param uId authenticated user id
 * @param preferredCampus user's preferred campus
 */
export interface IEditProfileService {
    uId: string;
    preferredCampus: string
}

/**
 * Class responsible for the service that serves to edit the profile of the authenticated user
 */
export class EditProfileService {
    /**
     * Method that allows editing the authenticated user's profile data
     */
    async execute({uId, preferredCampus}:IEditProfileService){
        const editProfileDBClient = createClient();

        // TODO: validação para bar (imagem url faz sentido?)
        if(await checkCampusExists(preferredCampus)) {
            // TODO: falta o bar e o url da imagem de perfil
            const query = await editProfileDBClient.query(`UPDATE users
            SET preferredcampus = $1   
            WHERE users.uid = $2`, [preferredCampus, uId])

            const data = query["rows"][0]

            return { data, status: 200 }
        }
        else {
            return { msg: "Invalid Data", status: 404 }
        }  
    }
}