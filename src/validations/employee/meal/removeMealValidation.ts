/**
 * @module removeMealValidation
 */
import { createClient } from "../../../config/db";

/**
 * For the bar employee to remove a meal that already exists on the menu, we first need to check if it already exists
 * 
 * @param mealId id of the meal to be removed
 */
export async function checkMealExists(mealId: string) {
    const checkMealExistsDBClient = createClient();
    const query = await checkMealExistsDBClient.query(`SELECT mealid FROM meals
                                                        WHERE mealid = $1 AND isdeleted = $2`, [mealId, false]);

    await checkMealExistsDBClient.end() 

    return query['rows'].length != 0
}

/**
 * For the employee to be able to delete a meal, he must first check if any user has already added that meal to the cart
 * 
 * @param mealId id of the meal to be removed
 */
export async function checkMealCartExists(mealId: string) {
    const checkMealExistsDBClient = createClient();
    const query = await checkMealExistsDBClient.query(`SELECT mealid FROM cartmeals
                                                        WHERE mealid = $1`, [mealId]);
        
    await checkMealExistsDBClient.end()

    return query['rows'].length != 0
}

/**
 * Allows to check if the cartmealid exists
 * 
 * @param cartMealId id of the meal that is present in a cart
 */
export async function checkCartMealExists(cartMealId: string) {
    const checkMealExistsDBClient = createClient();
    const query = await checkMealExistsDBClient.query(`SELECT cartmealid FROM cartmeals
                                                        WHERE cartmealid = $1`, [cartMealId]);
        
    await checkMealExistsDBClient.end() 

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
    
    await getMealBarDBClient.end()

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

    await checkMealExistsDBClient.end()
                                   
    return query['rows'][0]["preferredbar"]
}