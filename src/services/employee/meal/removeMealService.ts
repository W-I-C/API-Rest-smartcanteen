/**
 * @module removeMealService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { getMealBar } from "../../../validations/employee/meal/editMealValidation";
import { checkMealExists, getEmployeeBar } from "../../../validations/employee/meal/removeMealValidation";

/**
 * @param uId authenticated user id
 * @param mealId id of the meal to be removed
 */
export interface IRemoveMealService {
    uId: string,
    mealId: string
}

/**
 * Class responsible for the service that serves to remove a meal
 */
export class RemoveMealService {
    /**
     * Method that allows you to remove a meal
     */
    async execute({
        uId,
        mealId
    }:IRemoveMealService) {
        console.log("123")
        const mealIdExists = await checkMealExists(mealId)
        console.log(!mealIdExists)
        if(!mealIdExists){
            throw new Error('Meal does not exists')
        }
        
        const userBarId = await getEmployeeBar(uId);
        const mealBarId = await getMealBar(mealId);

        console.log(userBarId)
        console.log(mealBarId)

        if(userBarId != mealBarId) {
            throw new Error('Bars are not the same')
        }

        const removeMealDBClient= createClient();
        await removeMealDBClient.query(`DELETE FROM allowedchanges
                                        WHERE mealid = $1`, [mealId])

        await removeMealDBClient.query(`DELETE FROM meals
                                        WHERE mealid = $1`, [mealId])
        
        return { msg: "Meal successfully removed", status: 200 }
    }
}