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
    
    async execute(uId:string,mealId:string) {

        
        const mealsDetailDBClient=createClient();
        
        
 
        const query=await mealsDetailDBClient.query('SELECT name,preparationTime,description,canTakeAway,price,mealimages.url  from Meals LEFT JOIN mealimages ON meals.mealid = mealimages.mealid WHERE meals.mealid=$1',[mealId])
        
        const data=query["rows"]

        await mealsDetailDBClient.end()

        return { data, status: 200 }
    }
}