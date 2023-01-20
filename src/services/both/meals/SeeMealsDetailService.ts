/**
 * @module seeMealsDetailService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";

/**
 * Class responsible for the service that serves to get the details of a meal that the authenticated user has choose
 */
export class SeeMealsDetailService {
    /**
        * Method that allows you to get the details of a meal that the authenticated user has choose
        * @param uId authenticated user id
       
        */

    async execute(uId: string, mealId: string) {


        const mealsDetailDBClient = createClient();



        const query = await mealsDetailDBClient.query(`SELECT mealid,barid,name,preparationtime,description,cantakeaway,price,canbemade,url from meals
                                                        LEFT JOIN mealimages ON mealimages.mealid = meals.mealid
                                                        WHERE mealid=$1`, [mealId])

        const data = query["rows"]

        await mealsDetailDBClient.end()

        return { data, status: 200 }
    }
}