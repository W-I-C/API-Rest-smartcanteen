
/**
 * @module removeMealsCartService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { checkCartMealExists } from "../../../validations/employee/meal/removeMealValidation";

/**
 * class responsible for removing a meal from the cart
 */
export class RemoveMealsCartService {
    /**
       * Method that allows you to get the details of a meal that the authenticated user has added to favorites
       * @param uId authenticated user id
       * @param cartMealId id of the meal associated with the cart
       */
    async execute(cartMealId: string, uId: string) {


        const removeMealDBClient = createClient();

        const verifyUser = await removeMealDBClient.query('SELECT cartId from cart WHERE uId=$1 AND isCompleted=$2', [uId, false])

        const cartMealExists = await checkCartMealExists(cartMealId)
        if (!cartMealExists) {
            throw new Error("CartMeal dont exist")
        }

        if (verifyUser.rowCount > 0) {

            const query2 = await removeMealDBClient.query(`DELETE FROM cartMealsChanges
                                                        WHERE cartmealid=$1`, [cartMealId])

            const query = await removeMealDBClient.query(`DELETE FROM cartMeals
                                                        WHERE cartmealid=$1`, [cartMealId])


            const queryUser = await removeMealDBClient.query(`SELECT meals.name,cartmeals.cartmealid, meals.price, cartmeals.amount, meals.price*cartmeals.amount as mealtotal, 
                                                        (SELECT SUM(A.mealtotal) as carttotal FROM (SELECT meals.price*cartmeals.amount as mealtotal
                                                        FROM cart
                                                        JOIN cartmeals ON cart.cartid = cartmeals.cartid
                                                        JOIN meals ON cartmeals.mealid = meals.mealid
                                                        WHERE cart.uId = $1 AND cart.iscompleted = $2) A)
                                                        FROM cart
                                                        JOIN cartmeals ON cart.cartid = cartmeals.cartid
                                                        LEFT JOIN mealimages ON mealimages.mealid = cartmeals.mealid
                                                        JOIN meals ON cartmeals.mealid = meals.mealid
                                                        WHERE cart.uId = $1 AND cart.iscompleted = $2`, [uId, false])


            const data = queryUser["rows"]

            await removeMealDBClient.end()

            return { data, status: 200 }
        } else {

            await removeMealDBClient.end()

            throw new Error('The cart dont belongs to this user human');
        }
    }
}