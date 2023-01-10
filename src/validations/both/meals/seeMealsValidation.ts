/**
 * @module seeMealsValidation
 */
import { createClient } from "../../../config/db";

/**
 * Allows to get the role of the authenticated user
 * 
 * @param uId id of the authenticated user
 */
export async function getUserRole(uId: string) {
    const getUserRoleDBClient = createClient();
    const query = await getUserRoleDBClient.query(`SELECT roleid FROM users
                                                        WHERE uid = $1`, [uId]);

    return query['rows'][0]["roleid"]
}

/**
 * Allows to check if the bar exists
 * 
 * @param barId id of the bar
 */
export async function checkBarExists(barId: string) {
    const getUserRoleDBClient = createClient();

    const query = await getUserRoleDBClient.query(`SELECT * FROM bar
                                                        WHERE barid = $1`, [barId]);


    return query['rows'].length != 0
}



