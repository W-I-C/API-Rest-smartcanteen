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


export interface IChangesMeal{
    changeId:string,
    changeAmount:number
}


export class AddMealCartService {
    async execute(uId: string, mealId: string, amount: number,changes:Array<IChangesMeal>) {
        try {
            const addMealcart= createClient();
            const query= await addMealcart.query('SELECT cartid FROM cart WHERE uid=$1 AND isCompleted=$2', [uId,false])
            const cartid=query["rows"][0]["cartid"]

            const mealCanBeMade=await addMealcart.query('SELECT * FROM meals WHERE mealid=$1 AND canBeMade=$2',[mealId,true])
            
            if(mealCanBeMade!=null){
                
                if(cartid==null){
                    const timeElapsed = Date.now();
                    const today = new Date(timeElapsed);

                    const createCart=await addMealcart.query('INSERT INTO cart WHERE (uid,date,iscompleted) VALUES($1,$2,$3)',[uId,today,false])
                    const cartid=createCart["rows"][0]["cartid"]

                    const mealPrice=await addMealcart.query('SELECT price FROM meals WHERE mealid=$1',[mealId])
                    const price=mealPrice["rows"][0]["price"]
                    
                    const insertMeal=await addMealcart.query('INSERT INTO cartMeals (mealid,cartid,amount,mealprice) VALUES($1,$2,$3,$4)',[mealId,cartid,amount,price])
                    const selectcartmeal=await addMealcart.query('SELECT cartmealid FROM cartmeals ORDER BY inserttime DESC LIMIT 1')
                    const cartmealid=selectcartmeal["rows"][0]["cartmealid"]
                    console.log(cartmealid)
                    changes.forEach( async (currentvalue:IChangesMeal,index,array)=>{
                

                        const changes= await addMealcart.query('INSERT INTO cartMealsChanges (cartmealid,changeid,amount) VALUES($1,$2,$3)',[cartmealid,currentvalue.changeId,currentvalue.changeAmount])
                        
                    })
                    const cart=await addMealcart.query('SELECT mealid,amount,mealprice from cartmeals WHERE cartid=$1',[cartid])
                    const data=cart["rows"]
                    return { data, status: 200 }
                }else{
                    const mealPrice=await addMealcart.query('SELECT price FROM meals WHERE mealid=$1',[mealId])
                    const price=mealPrice["rows"][0]["price"]
                    
                    const insertMeal=await addMealcart.query('INSERT INTO cartMeals (mealid,cartid,amount,mealprice) VALUES($1,$2,$3,$4)',[mealId,cartid,amount,price])
                    const selectcartmeal=await addMealcart.query('SELECT cartmealid FROM cartmeals ORDER BY inserttime DESC LIMIT 1')
                    const cartmealid=selectcartmeal["rows"][0]["cartmealid"]
                    console.log(cartmealid)
                    changes.forEach( async (currentvalue:IChangesMeal,index,array)=>{
                

                        const changes= await addMealcart.query('INSERT INTO cartMealsChanges (cartmealid,changeid,amount) VALUES($1,$2,$3)',[cartmealid,currentvalue.changeId,currentvalue.changeAmount])
                        
                    })
                    const cart=await addMealcart.query('SELECT mealid,amount,mealprice from cartmeals WHERE cartid=$1',[cartid])
                    const data=cart["rows"]
                    return { data, status: 200 }
                }
        }else{
            
            throw console.error("Refeição não pode ser feita");
            
        }
        } catch (error) {
            console.log(error)
            return { status: 500, message: "Internal server error" }
        }
    }
}