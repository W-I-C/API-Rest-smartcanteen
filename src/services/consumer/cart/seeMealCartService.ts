
/**
 * @module seeMealsCartService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";

/**
 * Class responsible for the service that serves to see a meal at cart
 */
export class SeeMealsCartService {
 
    /**
     * Method that allows you to see a meal at cart
     */
        
    async execute(uId:string) {
        
        const seeMealsCartDBClient=createClient();

        

        const queryUser=await seeMealsCartDBClient.query(`SELECT meals.name,cartmeals.cartmealid, meals.price, cartmeals.amount, meals.price*cartmeals.amount as mealtotal, 
                                                            (SELECT SUM(A.mealtotal) as carttotal FROM (SELECT meals.price*cartmeals.amount as mealtotal
                                                            FROM cart
                                                            JOIN cartmeals ON cart.cartid = cartmeals.cartid
                                                            JOIN meals ON cartmeals.mealid = meals.mealid
                                                            WHERE cart.uId = $1 AND cart.iscompleted = $2) A)
                                                            FROM cart
                                                            JOIN cartmeals ON cart.cartid = cartmeals.cartid
                                                            JOIN meals ON cartmeals.mealid = meals.mealid
                                                            WHERE cart.uId = $1 AND cart.iscompleted = $2`,[uId,false])
        
        
   
                            

        const data=queryUser["rows"]

        await seeMealsCartDBClient.end()
        
        return { data, status: 200 }
    }  
}