/**
 * @module addMealCartService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { checkMealExists } from "../../../validations/employee/meal/editMealValidation";

/**
 * Class responsible for the service that serves to add meal to consumer cart
 */
export class AddMealCartService {
 
     /**
     * Method that allows you to get the details of a meal that the authenticated user has added to favorites
     * @param uId authenticated user id
     * @param mealId meal to be added to cart
     * @param amount quantity of meal to be added to cart
     */
    async execute( mealId:string,uId:string,amount:number) {
    
        const favMeal= createClient();
        let date= new Date();
       
        const verifyUser = await favMeal.query('SELECT cartId from cart WHERE uId=$1 AND isCompleted=$2',[uId,false])
        
        const mealExists = await checkMealExists(mealId)
        if(!mealExists) {
            throw new Error("Meal dont exist")
        }

        if (verifyUser.rowCount <= 0) {
            
            
            const queryCreateCart=await favMeal.query('INSERT INTO cart (uId,date,isCompleted) VALUES ($1,$2,$3)',[uId,date,false]) 
           
            const verifyUser=await favMeal.query('SELECT cartId from cart WHERE uId=$1 AND isCompleted=$2',[uId,false])

            const newcartId=verifyUser["rows"][0]["cartid"]

           
            const queryPrice=await favMeal.query('SELECT price from Meals WHERE mealId=$1',[mealId])

            const mealPrice= queryPrice["rows"][0]["price"]
            
            
            const query= await favMeal.query('INSERT INTO CartMeals (mealId,cartId,amount,mealPrice) VALUES ($1,$2,$3,$4)', [mealId,newcartId,amount,mealPrice])
        
            const data=query["rows"]
            
            return { data, status: 200 }
            
        }else{
            
            const cartId=verifyUser["rows"][0]["cartid"]
            const queryPrice=await favMeal.query('SELECT price from Meals WHERE mealId=$1',[mealId])
            const mealPrice= queryPrice["rows"][0]["price"]
            
            
            const query= await favMeal.query('INSERT INTO CartMeals (mealId,cartId,amount,mealPrice) VALUES ($1,$2,$3,$4)', [mealId,cartId,amount,mealPrice])
            
            const queryCart=await favMeal.query('SELECT mealid,amount,mealprice from cartmeals WHERE cartid=$1',[cartId])
            const data=queryCart["rows"]
            
            
            return { data, status: 200 }
            }
    }
}