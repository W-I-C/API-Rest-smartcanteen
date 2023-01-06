/**
 * @module addFavService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { IAddFavService } from "../../../models/IAddFavService";
import { checkMealExists } from "../../../validations/consumer/favoriteMeal/addFavValidation";
import { getEmployeeBar, getMealBar } from "../../../validations/employee/meal/editMealValidation";

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

        const userBar = await getEmployeeBar(uId)
        const mealBar = await getMealBar(mealId)

        if(userBar != mealBar) {
            throw new Error('Bars are not the same')
        }

        const query= await favMeal.query('INSERT INTO FavoriteMeals (uId, mealId) VALUES ($1,$2)', [uId,mealId])

        const queryFav= await favMeal.query('SELECT * from FavoriteMeals WHERE uid = $1', [uId])

        const data=queryFav["rows"]

        return { data, status: 200 }
   
    }
}