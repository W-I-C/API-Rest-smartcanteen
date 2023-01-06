/**
 * @module editProfileValidation
 */
import { createClient } from "../../../config/db";

/**
 * Allows to check if both the bar and the campus the user chose when editing the profile exist
 * 
 * @param campusId id of the campus the user wants to associate with his account
 * @param barId id of the bar the user wants to associate with his account
 */
export class EditProfileValidator {
    async validate(campusId: string, barId: string) {

        const checkCampusExistsDBClient = createClient();
        const queryCampusExists = await checkCampusExistsDBClient.query(`SELECT campusid FROM campus
                                                            WHERE campusid = $1`, [campusId]);

        
        const checkBarExistsDBClient = createClient();
        const queryBarExists = await checkBarExistsDBClient.query(`SELECT barid FROM bar
                                                            WHERE barid = $1`, [barId]);
                                                    
        // retorna true ou false
        return queryCampusExists['rows'].length != 0 && queryBarExists['rows'].length != 0
    }
}

/**
 * Allows to get the campus that the bar is associated to, to know if when editing the profile the user
 * chooses a bar that belongs to the campus that he selected
 * 
 * @param barId id of the bar to which we want to know the campus
 */
export async function getCampusBar(barId: string) {
    const getCampusBarDBClient = createClient();
    const query = await getCampusBarDBClient.query(`SELECT campusid
                                                    FROM bar
                                                    WHERE barid = $1`, [barId]);

    return query['rows'][0]['campusid']
}



