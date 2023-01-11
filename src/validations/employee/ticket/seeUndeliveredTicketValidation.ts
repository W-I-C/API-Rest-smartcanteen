/**
 * @module seeUndeliveredTicketValidation
 */
import { createClient } from "../../../config/db";

/**
 * An employee has access to a list of orders placed by different students that have not yet been delivered. 
 * These orders are placed for a certain bar and so this function allows you to get the employee's bar
 * 
 * @param uId id of the authenticated employee who wants to see the list of orders placed
 */
export async function getEmployeeBar(uId: string) {
    const checkMealExistsDBClient = createClient();
    const query = await checkMealExistsDBClient.query(`SELECT preferredbar FROM users
                                                        WHERE uid = $1`, [uId]);

    await checkMealExistsDBClient.end()
                                       
    return query['rows'][0]["preferredbar"]
}
