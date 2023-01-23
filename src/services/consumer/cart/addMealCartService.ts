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
    async execute(uId: string, mealId: string, amount: number) {
        try {
            const addMealcart= createClient();
            const query= await addMealcart.query('SELECT cartid FROM cart WHERE uid=$1 AND isCompleted=$2', [uId,false])
            const cartid=query["rows"][0]["cartid"]
            if(cartid==null){
                const timeElapsed = Date.now();
                const today = new Date(timeElapsed);

                const createCart=await addMealcart.query('INSERT INTO cart WHERE (uid,date,iscompleted) VALUES($1,$2,$3)',[uId,today,false])
                const cartid=createCart["rows"][0]["cartid"]

                const mealPrice=await addMealcart.query('SELECT price FROM meals WHERE mealid=$1',[mealId])
                const price=mealPrice["rows"][0]["price"]

                const insertMeal=await addMealcart.query('INSERT INTO cartMeals (mealid,cartid,amount,mealprice) VALUES($1,$2,$3,$4)',[mealId,cartid,amount,price])
                const cart=await addMealcart.query('SELECT mealid,amount,mealprice from cartmeals WHERE cartid=$1',[cartid])
                const data=cart["rows"]
                return { data, status: 200 }
            }else{
                const mealPrice=await addMealcart.query('SELECT price FROM meals WHERE mealid=$1',[mealId])
                const price=mealPrice["rows"][0]["price"]
                const insertMeal=await addMealcart.query('INSERT INTO cartMeals (mealid,cartid,amount,mealprice) VALUES($1,$2,$3,$4)',[mealId,cartid,amount,price])
                const cart=await addMealcart.query('SELECT mealid,amount,mealprice from cartmeals WHERE cartid=$1',[cartid])
                const data=cart["rows"]
                return { data, status: 200 }
            }
        } catch (error) {
            console.log(error)
            return { status: 500, message: "Internal server error" }
        }
    }
}