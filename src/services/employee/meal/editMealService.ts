/**
 * @module editMealService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";

/**
 * @param uId authenticated user id
 * @param mealId id of the meal to be changed
 * @param barId id of the bar with which the meal will be associated
 * @param name meal name
 * @param preparationTime the time it takes to prepare the meal
 * @param description description of the meal
 * @param canTakeaway indicates whether the meal can be consumed outside the bar or not
 * @param price price of the meal
 */
export interface IEditMealService {
    uId: string,
    mealId: string,
    name: string,
    preparationTime: number,
    description: string,
    canTakeaway: number, 
    price: number
}

/**
 * Class responsible for the service that serves to edit the data of a meal
 */
export class EditMealService {
    /**
     * Method that allows you to edit the data of a meal
     */
    async execute({
        uId,
        mealId,
        name,
        preparationTime,
        description,
        canTakeaway,
        price
    }:IEditMealService) {
        // TODO: validação para ver se o barid da meal é o mesmo que o do funcionário
        const editMealDBClient= createClient();
        const query= await editMealDBClient.query(`UPDATE meals
                                                    SET name = $1, preparationTime = $2, description = $3, canTakeAway = $4, price = $5
                                                    WHERE mealid = $6`, [mealId, name, preparationTime, description, canTakeaway, price])
        
        return { data: {query}, status: 200 }
   
    }
}