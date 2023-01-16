/**
 * @module editMealService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { IMeal } from "../../../models/IMeal";
import { IMealAllowedChange } from "../../../models/IMealAllowedChanges";
import { checkMealExists, checkMealExistsBar, getEmployeeBar, getMealBar } from "../../../validations/employee/meal/editMealValidation";

/**
 * Class responsible for the service that serves to edit the data of a meal
 */
export class EditMealService {
    /**
     * Method that allows you to edit the data of a meal
     */
    async execute(
        uId: string,
        mealId: string,
        name: string,
        preparationTime: number,
        description: string,
        canTakeaway: boolean,
        price: number) {
            
        const mealIdExists = await checkMealExists(mealId)

        if(!mealIdExists){
            throw new Error('Meal does not exists')
        }

        // get the bar where the employee works
        const userBarId = await getEmployeeBar(uId);
        const mealBarId = await getMealBar(mealId);

        if(userBarId != mealBarId) {
            throw new Error('Bars are not the same')
        }

        // check if a meal already exists in that bar (they can't be repeated)
        const meal = await checkMealExistsBar(name, userBarId)
        if(meal){
            throw new Error('Meal already exists in this bar')
        }

        const editMealDBClient= createClient();
        await editMealDBClient.query(`UPDATE meals
                                    SET name = $1, preparationTime = $2, description = $3, canTakeAway = $4, price = $5
                                    WHERE mealid = $6`, [name, preparationTime, description, canTakeaway, price, mealId])
        
        await editMealDBClient.end()

        return { msg: "Updated Meal Successfully" , status: 200 }
    }
}