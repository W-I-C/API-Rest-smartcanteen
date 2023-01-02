/**
 * @module addFavService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { IAddFavService } from "../../../models/IAddFavService";

/**
 * Class responsible for the service that serves to add a meal to favoritemeal
 */
export class AddFavService {
  /**
     * Method that allows you to add a meal to favorite meal
     */
   
    async execute( {
        mealId,
        uId
    }:IAddFavService) {

        const favMeal= createClient();
      
        const query= await favMeal.query('INSERT INTO FavoriteMeals (uId, mealId) VALUES ($1,$2)', [uId,mealId])
        
        const queryFav= await favMeal.query('SELECT * from FavoriteMeals')

        const data=queryFav["rows"]

        return { data, status: 200 }
   
    }
}