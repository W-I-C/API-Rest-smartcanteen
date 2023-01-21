/**
 * @module seeFavService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";

/**
 * Class responsible for the service that serves to get all the meals that the authenticated user has already added to favorites
 */
export class SeeFavService {
    /**
     * Method that allows you to get all meals from the authenticated user
     * @param uId authenticated user id
     */
    async execute(uId: string) {
        const seeFavDBClient = createClient();

        const query = await seeFavDBClient.query(`SELECT meals.mealid,meals.name, meals.preparationtime, meals.price, mealimages.url, meals.description 
                                            FROM favoritemeals 
                                            JOIN meals ON favoritemeals.mealid = meals.mealid 
                                            LEFT JOIN mealimages ON meals.mealid = mealimages.mealid 
                                            WHERE favoritemeals.uid = $1`, [uId])

        const data = query["rows"]

        await seeFavDBClient.end()

        return { data, status: 200 }
    }
}
