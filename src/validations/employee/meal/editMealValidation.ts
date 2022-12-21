import { createClient } from "../../../config/db";

export async function checkMealExists(mealId: string) {
    const checkMealExistsDBClient = createClient();
    const query = await checkMealExistsDBClient.query(`SELECT mealid FROM meals
                                                        WHERE mealid = $1`, [mealId]);

                                                        
    return query['rows'].length != 0
}

export async function getMealBar(mealId: string) {
    const getMealBarDBClient = createClient();
    const query = await getMealBarDBClient.query(`SELECT barid FROM meals
                                                    WHERE mealid = $1`, [mealId]);

    return query['rows']
}

// TODO: falta acrescentar o barid ao user
export async function getBarUser(uId: string) {
    const getMealBarDBClient = createClient();
    const query = await getMealBarDBClient.query(`SELECT barid FROM users
                                                    WHERE uid = $1`, [uId]);

    return query['rows']
}
