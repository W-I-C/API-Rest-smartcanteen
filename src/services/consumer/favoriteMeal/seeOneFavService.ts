/**
 * @module seeOneFavService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";

/**
 * Class responsible for the service that serves to get the details of a meal that the authenticated user has already added to favorites
 */
export class SeeOneFavService {
    /**
     * Method that allows you to get the details of a meal that the authenticated user has added to favorites
     * @param uId authenticated user id
     * @param favMealId id of the meal that the authenticated user has added to favorites and wants to see the details of
     */
    async execute(uId: string, favMealId: string) {
        const seeOneFavDBClient = createClient();

        // TODO: user a ver uma refeição que não lhe pertence dá status 200 e devia dar 404
        
        const query = await seeOneFavDBClient.query(`SELECT meals.name, meals.preparationtime, meals.price, mealimages.url 
                                            FROM favoritemeals 
                                            JOIN meals ON favoritemeals.mealid = meals.mealid 
                                            LEFT JOIN mealimages ON meals.mealid = mealimages.mealid 
                                            WHERE favoritemeals.favoritemealid = $1 AND favoritemeals.uid = $2`, [favMealId, uId]) 
        
        const data = query["rows"][0]
                                            
        return { data, status: 200 }
    }
}