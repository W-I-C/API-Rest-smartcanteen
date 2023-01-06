/**
 * @module seeTradesValidation
 */
import { createClient } from "../../../config/db";

/**
 * A user can see all the available exchanges on the campus he or she prefers. 
 * To do this it is first necessary to get the user's preferred campus
 * 
 * @param uId id of the user we want to know the preferred campus
 */
export async function getUserCampus(uId: string) {
    const getUserCampusDBClient = createClient();
    const query = await getUserCampusDBClient.query(`SELECT preferredcampus 
                                                    FROM users
                                                    WHERE uid = $1`, [uId]);
                              
    return query['rows'][0]["preferredcampus"]
}