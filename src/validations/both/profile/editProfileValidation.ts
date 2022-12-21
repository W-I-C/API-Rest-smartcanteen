import { createClient } from "../../../config/db";

export class EditProfileValidator {
    async validate(campusId: string, barId: string) {
        const checkCampusExistsDBClient = createClient();
        const queryCampusExists = await checkCampusExistsDBClient.query(`SELECT campusid FROM campus
                                                            WHERE campusid = $1`, [campusId]);


        const checkBarExistsDBClient = createClient();
        const queryBarExists = await checkBarExistsDBClient.query(`SELECT barid FROM bar
                                                            WHERE barid = $1`, [barId]);
                                                    

        const checkCampusBarDBClient = createClient();
        const queryCampusBar = await checkCampusBarDBClient.query(`SELECT campus.name, bar.name AS barName
                                                        FROM campus
                                                        JOIN bar ON campus.campusid = bar.campusid
                                                        WHERE bar.campusid = $1 AND bar.barid = "2"`, [campusId, barId]);
        
        // retorna true ou false
        return queryCampusExists['rows'].length != 0 && queryBarExists['rows'].length != 0 && queryCampusBar['rows'].length != 0 
    }
}


