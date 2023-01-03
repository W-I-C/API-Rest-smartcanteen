/**
 * @module addFavService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { IAddFavService } from "../../../models/IAddFavService";
import { checkMealExists } from "../../../validations/consumer/favoriteMeal/addFavValidation";

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
      
        const mealIdExists = await checkMealExists(mealId)
        if(!mealIdExists){
            throw new Error('Meal does not exists')
        }

        // TODO: ver se o bar da meal e o bar do user é igual

        const query= await favMeal.query('INSERT INTO FavoriteMeals (uId, mealId) VALUES ($1,$2)', [uId,mealId])
        
        // TODO: verificação para ver se o isDeleted é false - acrescentar aos testes de código
        const queryFav= await favMeal.query('SELECT * from FavoriteMeals')

        const data=queryFav["rows"]

        return { data, status: 200 }
   
    }
}