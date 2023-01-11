/**
 * @module seeDetailMealService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";


    /**
    * Class responsible for the service that serves to create meals in barget details from order
    **/
export class SeeDetailsMealTicketService {
   /**
     * Method that allows you to get the details of a meal that the employee from order
     * @param ticketId id ticket to search  
     */

    async execute(ticketId:string) { 
    const seeMeals = createClient();
  
    try {
      
      const selectCartResult = await seeMeals.query('SELECT cartid from tickets WHERE ticketid=$1', [ticketId]);
      const cart = selectCartResult["rows"][0]["cartid"];
  
     
      const selectMealResult = await seeMeals.query('SELECT mealid from cartmeals WHERE cartid=$1', [cart]);
      const mealIds = selectMealResult["rows"];
  
      
      const mealData = [];
      for(let i = 0; i < mealIds.length; i++) {
        const meal = mealIds[i]["mealid"];
        const detail = await seeMeals.query('SELECT name,description,canTakeAway from meals WHERE mealId=$1', [meal]);

        const data = detail["rows"][0];
        mealData.push(data);
      }
      
      await seeMeals.end()

      return { data: mealData, status: 200 };
    } catch (error) {

      await seeMeals.end()
      
      return { error: error.message, status: 500 };
    }
  }
    
   
}
