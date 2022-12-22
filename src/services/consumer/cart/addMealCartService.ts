require('dotenv').config();
import { createClient } from "../../../config/db";


export class AddMealCartService {
 
    async execute( mealId:string,uId:string,amount:number) {


    
        const favMeal= createClient();
        let date= new Date();
        console.log(date)
        const verifyUser=await favMeal.query('SELECT cartId from cart WHERE uId=$1 AND isCompleted=$2',[uId,false])
        
        

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
            console.log(mealPrice)
            
            const query= await favMeal.query('INSERT INTO CartMeals (mealId,cartId,amount,mealPrice) VALUES ($1,$2,$3,$4)', [mealId,cartId,amount,mealPrice])
        
            const data=query["rows"]
            
            return { data, status: 200 }
            }
        

    }
}