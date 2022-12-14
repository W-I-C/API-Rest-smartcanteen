/**
 * @module editMealValidation
 */
import { createClient } from "../../../config/db";

/**
 * For the bar employee to edit a meal that already exists on the menu, we first need to check if it already exists
 * 
 * @param mealId id of the meal to be edited
 */
export async function checkMealExists(mealId: string) {
    const checkMealExistsDBClient = createClient();
    const query = await checkMealExistsDBClient.query(`SELECT mealid FROM meals
                                                        WHERE mealid = $1 AND isdeleted = $2`, [mealId, false]);

    await checkMealExistsDBClient.end()   

    return query['rows'].length != 0
}

export async function checkCartMealsExists(cartId: string) {
    const checkMealExistsDBClient = createClient();
    const query = await checkMealExistsDBClient.query(`SELECT cartmealid FROM cartmeals
                                                        WHERE cartid = $1`, [cartId]);

    await checkMealExistsDBClient.end()         

    return query['rows'].length != 0
}

export async function checkBarFromMealsExists(mealId: string) {
    const checkMealExistsDBClient = createClient();
    const query = await checkMealExistsDBClient.query(`SELECT barid FROM meals
                                                        WHERE mealid = $1`, [mealId]);

    await checkMealExistsDBClient.end()       

    return query['rows'].length != 0
}



/**
 * A meal is on the bar menu. For the employee to be able to edit this meal, 
 * it is necessary to check if the bar of the meal is the same as the employee's bar.
 * This function allows to get the bar of the meal
 * 
 * @param mealId id of the meal to be edited
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
 * @param uId id of the employee that wants to edit the meal
 */
export async function getEmployeeBar(uId: string) {
    const checkMealExistsDBClient = createClient();
    const query = await checkMealExistsDBClient.query(`SELECT preferredbar FROM users
                                                        WHERE uid = $1`, [uId]);

    await checkMealExistsDBClient.end()       

    return query['rows'][0]["preferredbar"]
}

/**
 * A bar has a menu with various meals. Each meal can only appear once on that menu.
 * The user when editing the meal cannot choose a name of a meal that already exists in that bar.
 * So this function allows to check if that bar already has that meal name.
 * 
 * @param name name that the authenticated employee intends to give to the meal
 * @param barId id of the bar to which the meal belongs
 */
export async function checkMealExistsBar(name: string, barId: string) {
    const MealExists = createClient();
    const query = await MealExists.query(`SELECT * FROM meals 
                                        WHERE name=$1 AND barId=$2 AND isdeleted = $3`,[name, barId, false])
    
    await MealExists.end()     
                        
    return query['rows'].length != 0
}


