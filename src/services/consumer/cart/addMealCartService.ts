/**
 * @module addMealCartService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { IMealChange } from "../../../models/IMealChange";
import { checkCartMealsExists, checkMealExists, getMealBar } from "../../../validations/employee/meal/editMealValidation";

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
    async execute( mealId:string,uId:string,amount:number, changes:Array<IMealChange>) {
    
        const favMeal= createClient();
        let date= new Date();
       //TODO : por a rota a funcionar
        const query = await favMeal.query('SELECT cartId from cart WHERE uId=$1 AND isCompleted=$2',[uId,false])
        const cartUser=query["rows"][0]["cartId"] 

        const mealExists = await checkMealExists(mealId)
        const mealsCart = await checkCartMealsExists(cartUser)

        
        if(!mealExists) {
            throw new Error("Meal dont exist")
        }

        if (query.rowCount <= 0) {
            
            
            const queryCreateCart=await favMeal.query('INSERT INTO cart (uId,date,isCompleted) VALUES ($1,$2,$3)',[uId,date,false]) 
           
            const cartQuery=await favMeal.query('SELECT cartId from cart WHERE uId=$1 AND isCompleted=$2',[uId,false])

            const newcartId=cartQuery["rows"][0]["cartid"]

           
            const queryPrice=await favMeal.query('SELECT price from Meals WHERE mealId=$1',[mealId])

            const queryChange=await favMeal.query('SELECT * from allowedChanges WHERE mealid=$1', [mealId])
            const value=queryChange["rows"]

            if(value.length>=0){
                const mealPrice= queryPrice["rows"][0]["price"]
            
            
                const query= await favMeal.query('INSERT INTO cartmeals (mealId,cartId,amount,mealPrice) VALUES ($1,$2,$3,$4)', [mealId,newcartId,amount,mealPrice])
                const selectinfomeals=await favMeal.query('SELECT * FROM cartmeals WHERE  (mealId,cartId,amount,mealPrice)',[])
                const data=query["rows"]
                
                return { data, status: 200 }

            }else{

            const mealPrice= queryPrice["rows"][0]["price"]
            
            
            const query= await favMeal.query('INSERT INTO CartMeals (mealId,cartId,amount,mealPrice) VALUES ($1,$2,$3,$4)', [mealId,newcartId,amount,mealPrice])
        
            const data=query["rows"]
            
            return { data, status: 200 }
            }
            
        }else{

            const cartId=cartUser["rows"][0]["cartid"]
            const queryPrice=await favMeal.query('SELECT price from Meals WHERE mealId=$1',[mealId])
            const mealPrice= queryPrice["rows"][0]["price"]

            if(!mealsCart){
   
                const query= await favMeal.query('INSERT INTO CartMeals (mealId,cartId,amount,mealPrice) VALUES ($1,$2,$3,$4)', [mealId,cartId,amount,mealPrice])
                
                const queryCart=await favMeal.query('SELECT mealid,amount,mealprice from cartmeals WHERE cartid=$1',[cartId])
                const data=queryCart["rows"]
                
            
                return { data, status: 200 }
            }else{
                const queryBar=await favMeal.query('SELECT * FROM cartmeals WHERE cartid=$1',[cartUser])
                const selectMealUser=queryBar["rows"][0]["mealId"]

                const barMeal= getMealBar(selectMealUser)
                const newBarMeal= getMealBar(mealId)

                if(barMeal != newBarMeal) {
                    throw new Error("Bars are not the same")
                } else {
                    
                    const query= await favMeal.query('INSERT INTO CartMeals (mealId,cartId,amount,mealPrice) VALUES ($1,$2,$3,$4)', [mealId,cartId,amount,mealPrice])
                    
                    const queryCart=await favMeal.query('SELECT mealid,amount,mealprice from cartmeals WHERE cartid=$1',[cartId])
                    const data=queryCart["rows"]
                    
                
                    return { data, status: 200 }
                }


            }
        }
    }
}