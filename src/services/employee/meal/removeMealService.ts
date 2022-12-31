/**
 * @module removeMealService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { IRemoveMealService } from "../../../models/IRemoveMealService";
import { getMealBar } from "../../../validations/employee/meal/editMealValidation";
import { checkMealExists, getEmployeeBar } from "../../../validations/employee/meal/removeMealValidation";

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
        
        // TODO: meter isDeleted só para esta meal não ser mostrada ao utilizador final
        // TODO: apagar a meal caso ela não esteja associada a um ticket
        const removeMealDBClient= createClient();
        await removeMealDBClient.query(`DELETE FROM allowedchanges
                                        WHERE mealid = $1`, [mealId])

        await removeMealDBClient.query(`DELETE FROM meals
                                        WHERE mealid = $1`, [mealId])
        
        return { msg: "Meal successfully removed", status: 200 }
    }
}