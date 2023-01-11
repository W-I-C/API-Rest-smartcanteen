/**
 * @module removeFavValidation
 */
import { createClient } from "../../../config/db";

/**
 * For the consumer to remove a meal from the favorites, first we need to check if the favorite meal exists
 * 
 * @param favMealId id of the favorite meal to be removed
 */
export async function checkFavMealExists(favMealId: string) {
    const checkMealExistsDBClient = createClient();
    const query = await checkMealExistsDBClient.query(`SELECT * FROM favoritemeals
                                                        WHERE favoritemealid = $1`, [favMealId]);

    await checkMealExistsDBClient.end()      

    return query['rows'].length != 0
}

/**
 * If the user can see the details of a favorite meal, he can only see the favorite meals that belong to him
 * 
 * @param favMealId id of the favorite meal the user wants to see more details about
 */
export async function getUserFavMeal(favMealId: string) {
    const checkMealExistsDBClient = createClient();
    const query = await checkMealExistsDBClient.query(`SELECT uid FROM favoritemeals
                                                        WHERE favoritemealid = $1`, [favMealId]);

    await checkMealExistsDBClient.end()     
                                           
    return query['rows'][0]["uid"]
}