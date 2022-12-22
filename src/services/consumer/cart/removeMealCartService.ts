
/**
 * @module removeMealsCartService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";

/**
 * class responsible for removing a meal from the cart
 */
export class RemoveMealsCartService {
  /**
     * Method that allows you to get the details of a meal that the authenticated user has added to favorites
     * @param uId authenticated user id
     * @param cartMealId id of the meal associated with the cart
     */
    async execute( cartMealId:string,uId:string) {

        
        const removeMeal= createClient();
        const verifyUser= await removeMeal.query('SELECT cartId from cart WHERE uId=$1', [uId])

        
        if(verifyUser.rowCount>0){
        const query= await removeMeal.query('DELETE FROM cartMeals WHERE cartMealId=$1',[cartMealId])

        const querySelect= await removeMeal.query('SELECT * from cart WHERE uId=$1',[uId])
        const data=querySelect["rows"]
        return { data, status: 200 }
        }else{
            throw new Error('o user não pertence a este carrinho');
            
        }
    }
}