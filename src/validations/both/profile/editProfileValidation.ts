import { createClient } from "../../../config/db";

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

export async function getCampusBar(barId: string) {
    const getCampusBarDBClient = createClient();
    const query = await getCampusBarDBClient.query(`SELECT campusid
                                                    FROM bar
                                                    WHERE barid = $1`, [barId]);

    return query['rows'][0]['campusid']
}



