/**
 * @module addFavService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";

/**
 * @param uId authenticated user id
 * @param mealId id of the meal to be removed
 */
export interface IAddFavService {
   
   mealId:string,
   uId:string
}

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

        return { data: {queryFav}, status: 200 }
   
    }
}