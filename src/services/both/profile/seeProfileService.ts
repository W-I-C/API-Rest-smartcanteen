/**
 * @module seeProfileService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";

/**
 * Class responsible for the service that serves to obtain the profile data of the authenticated user
 */
export class SeeProfileService {
    /**
     * Method that allows getting the authenticated user's profile data
     * @param uId authenticated user id
     */
    async execute(uId: string){
        const seeProfileDBClient = createClient();

        // TODO: fazer JOIN para ir à outra tabela buscar o bar preferido e o url da imagem de perfil
        const query = await seeProfileDBClient.query(`SELECT users.name, campus.name AS campusName 
                                            FROM users JOIN campus ON users.preferredCampus = campus.campusid 
                                            WHERE users.uid = $1`, [uId])
        
        const data = query["rows"][0]

        return { data, status: 200 }
    }
}