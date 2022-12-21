import { createClient } from "../../../config/db";

export async function getEmployeeBar(uId: string) {
    const checkMealExistsDBClient = createClient();
    const query = await checkMealExistsDBClient.query(`SELECT preferredbar FROM users
                                                        WHERE uid = $1`, [uId]);

                                                        
    return query['rows'][0]["preferredbar"]
}