import { createClient } from "../../../config/db";

/**
 * For the bar employee to remove a meal that already exists on the menu, we first need to check if it already exists
 * 
 * @param mealId id of the meal to be removed
 */
export async function checkMealExists(mealId: string) {
    const checkMealExistsDBClient = createClient();
    const query = await checkMealExistsDBClient.query(`SELECT mealid FROM meals
                                                        WHERE mealid = $1`, [mealId]);

                                                        
    return query['rows'].length != 0
}

/**
 * A meal is on the bar menu. For the employee to be able to remove this meal, 
 * it is necessary to check if the bar of the meal is the same as the employee's bar.
 * This function allows to get the bar of the meal
 * 
 * @param mealId id of the meal to be removed
 */
export async function getMealBar(mealId: string) {
    const getMealBarDBClient = createClient();
    const query = await getMealBarDBClient.query(`SELECT barid FROM meals
                                                    WHERE mealid = $1`, [mealId]);

    return query['rows'][0]["barid"]
}

/**
 * To be able to compare the meal bar with the employee bar (like the function above), 
 * This function allows to get the employee bar
 * 
 * @param uId id of the employee that wants to remove the meal
 */
export async function getEmployeeBar(uId: string) {
    const checkMealExistsDBClient = createClient();
    const query = await checkMealExistsDBClient.query(`SELECT preferredbar FROM users
                                                        WHERE uid = $1`, [uId]);

                                                        
    return query['rows'][0]["preferredbar"]
}