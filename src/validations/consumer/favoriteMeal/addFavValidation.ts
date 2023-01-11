/**
 * @module addFavValidation
 */
import { createClient } from "../../../config/db";

/**
 * For the user to insert a meal in the favorites, first we need to check if the meal exists
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
