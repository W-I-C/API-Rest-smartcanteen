/**
 * @module removeMealService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { IRemoveMealService } from "../../../models/IRemoveMealService";
import { getMealBar } from "../../../validations/employee/meal/editMealValidation";
import { checkMealCartExists, checkMealExists, getEmployeeBar } from "../../../validations/employee/meal/removeMealValidation";

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

        const mealIdExists = await checkMealExists(mealId)

        if(!mealIdExists){
            throw new Error('Meal does not exists')
        }
        
        const userBarId = await getEmployeeBar(uId);
        const mealBarId = await getMealBar(mealId);
        
        if(userBarId != mealBarId) {
            throw new Error('Bars are not the same')
        }

        const removeMealDBClient= createClient();
        
        const mealCart = checkMealCartExists(mealId)

        if(mealCart){
            await removeMealDBClient.query(`UPDATE meals
                                        SET isdeleted = $1
                                        WHERE mealid = $2`, [true, mealId])
        }
        else {
            throw new Error('Impossible to remove the meal')
        }

        // TODO: mandar uma notificação ao utilizador - acrescentar aos testes de código as novas verificações
        return { msg: "Meal successfully removed", status: 200 }
    }
}