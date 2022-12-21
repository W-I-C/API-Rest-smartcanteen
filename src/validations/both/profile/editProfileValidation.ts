import { createClient } from "../../../config/db";

export async function checkCampusExists(campusId: string) {
    const checkCampusExistsDBClient = createClient();
    const query = await checkCampusExistsDBClient.query(`SELECT campusid FROM campus
                                                        WHERE campusid = $1`, [campusId]);

    // retorna true ou false                                                    
    return query['rows'].length != 0
}