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
        
        const removeAllowedChanges = await removeMealDBClient.query(`SELECT * FROM allowedchanges
                                        WHERE mealid = $1`, [mealId])
        
        const allowedChanges = removeAllowedChanges["rows"]

        await removeMealDBClient.query(`DELETE FROM allowedchanges
                                        WHERE mealid = $1`, [mealId])
        
        // se a refeição não está em nenhum ticket
        try {
            const removeMeal = await removeMealDBClient.query(`DELETE FROM meals
                                        WHERE mealid = $1`, [mealId])
        } catch (err) {
            console.log(err.stack)
        }
        

        // if()


        // se a refeição ainda não está num ticket - num carrinho finalizado
        // se a refeição estiver em algum carrinho não finalizado, removemos a refeição desses carrinhos e mandamos uma notificação ao utilizador

        

        await removeMealDBClient.query(`DELETE FROM meals
                                        WHERE mealid = $1`, [mealId])
        
        return { msg: "Meal successfully removed", status: 200 }
    }
}