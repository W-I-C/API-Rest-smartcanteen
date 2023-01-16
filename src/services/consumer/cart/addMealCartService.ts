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
    async execute(uId: string, mealId:string, amount: number, allowedChanges: {changeid:string,ingname:string,ingdosage:number,isremoveonly:boolean,canbeincremented:boolean,canbedcremented:boolean,incrementlimit:number,decrementlimit:number}[]) {
      const addMealToCartDBClient = createClient();
      try {
          // Verify if the cart belongs to the authenticated user and is not completed
          const cartVerification = await addMealToCartDBClient.query(`
              SELECT cartid, iscompleted
              FROM cart
              WHERE uId = $1 AND iscompleted = $2
          `, [uId, false]);
          let cartId:string;
          if(!cartVerification.rows.length) {
              // If the cart is completed or does not belong to the user, create a new one
              const newCart = await addMealToCartDBClient.query(`
                  INSERT INTO cart (uId, date, iscompleted)
                  VALUES ($1, $2, $3)
                  RETURNING cartid
              `, [uId, new Date(), false]);
              cartId = newCart.rows[0].cartid;
          }else{
              cartId = cartVerification.rows[0].cartid;
          }
          
          // Add the meal to the cart
          const addedMeal = await addMealToCartDBClient.query(`
              INSERT INTO cartmeals (cartid, mealid, amount, mealprice)
              VALUES ($1, $2, $3, (SELECT price FROM meals WHERE mealid = $2))
              RETURNING cartmealid
          `, [cartId, mealId, amount]);
          let cartMealId = addedMeal.rows[0].cartmealid;
          
          // Check if the meal has allowed changes
          if(allowedChanges.length > 0) {
              // Add the allowed changes to the cartmeal
              for(const change of allowedChanges) {
                  const allowedChange = await addMealToCartDBClient.query(`
                  SELECT changeid, mealid, ingname, ing        dosage, isremoveonly, canbeincremented, canbedcremented, incrementlimit, decrementlimit
                  FROM allowedchanges
                  WHERE changeid = $1 AND mealid = $2
                  `, [change.changeid, mealId])
                  if(!allowedChange.rows.length) {
                      throw new Error(`Change with id ${change.changeid} for meal ${mealId} is not allowed`);
                  }
                  await addMealToCartDBClient.query(`
                      INSERT INTO cartmealschange (cartmealid, changeid, amount)
                      VALUES ($1, $2, $3)
                  `, [cartMealId, change.changeid, change.ingdosage]);
              }
          }
          return { message: "Meal added to cart successfully", status: 200 };
      } catch (error) {
          console.log(error)
          return { error: error.message, status: 500 };
      } 
    }
  }
  
  