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

  async execute(ticketId: string) {
    const seeMeals = createClient();

    try {

      const selectCartResult = await seeMeals.query('SELECT cartid from tickets WHERE ticketid=$1', [ticketId]);
      const cart = selectCartResult["rows"][0]["cartid"];


      const selectMealResult = await seeMeals.query(`SELECT cartmeals.mealid,amount,mealprice, meals.name, description, canTakeAway from cartmeals 
                                                      JOIN meals ON meals.mealid = cartmeals.mealid
                                                      WHERE cartid=$1`, [cart]);
      const meals = selectMealResult["rows"];



      for (let i = 0; i < meals.length; i++) {
        const mealid = meals[i]["mealid"];

        const changes = await seeMeals.query(`SELECT allowedchanges.ingname,cartmealschanges.amount as ingamount,allowedchanges.isremoveonly,
                                                allowedchanges.canbeincremented, allowedchanges.canbedecremented from cartmeals 
                                              JOIN meals ON meals.mealid = cartmeals.mealid
                                              LEFT JOIN mealimages ON mealimages.mealid = meals.mealid
                                              JOIN cartmealschanges ON cartmealschanges.cartmealid = cartmeals.cartmealid
                                              JOIN allowedchanges ON allowedchanges.changeid = cartmealschanges.changeid
                                              WHERE cartid=$1 AND meals.mealid = $2`, [cart, mealid])

        const mealchanges = changes["rows"];
        meals[i]['mealchanges'] = mealchanges;
      }

      await seeMeals.end()

      return { data: meals, status: 200 };
    } catch (error) {

      await seeMeals.end()

      return { error: error.message, status: 500 };
    }
  }


}
