/**
 * @module removeMealService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";

/**
 * @param uId authenticated user id
 * @param mealId id of the meal to be changed
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
        // TODO: falta o barid do user para ser possível remover
        // TODO: ao apagar temos também que remover as alterações daquelas refeições
        const removeMealDBClient= createClient();
        const query= await removeMealDBClient.query(`UPDATE meals
                                                    SET name = $1, preparationTime = $2, description = $3, canTakeAway = $4, price = $5
                                                    WHERE mealid = $6`, [uId, mealId])
        
        return { data: {query}, status: 200 }
    }
}