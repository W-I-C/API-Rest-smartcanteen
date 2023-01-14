/**
 * @module removeFavService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { checkFavMealExists, getUserFavMeal } from "../../../validations/consumer/favoriteMeal/removeFavValidation";

/**
 * Class responsible for the service that serves to remove one of the meals from the favorites of the authenticated user
 */
export class RemoveFavService {
    /**
     * Method that allows the authenticated user to remove a meal from favorites
     * 
     * @param uId authenticated user id
     * @param favMealId id of the meal to be removed from favorites
     */
    async execute(uId: string, mealId:string) {
        
        const removeFavDBClient = createClient();
        const query = await removeFavDBClient.query(`DELETE FROM favoritemeals 
                                            WHERE uid = $1 AND mealid = $2`, [uId, mealId])

        const queryFav= await removeFavDBClient.query('SELECT * from FavoriteMeals WHERE uid = $1', [uId])
        
        const data = queryFav["rows"]

        await removeFavDBClient.end()

        return { data, status: 200 }
    }
}