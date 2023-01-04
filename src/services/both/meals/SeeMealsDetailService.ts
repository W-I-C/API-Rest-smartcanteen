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

        
        const mealsDetail=createClient();
        
        
 
        const query=await mealsDetail.query('SELECT name,preparationTime,description,canTakeAway,price from Meals WHERE mealid=$1',[mealId])
        
    
        const data=query["rows"]
        return { data, status: 200 }
   
        

 
   
    }
}