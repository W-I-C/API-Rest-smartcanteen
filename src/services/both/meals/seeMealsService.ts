/**
 * @module seeMealsService
 */

require('dotenv').config();
import { createClient } from "../../../config/db";
import { checkBarExists } from "../../../validations/both/meals/seeMealsValidation";
import { getEmployeeBar } from "../../../validations/employee/meal/editMealValidation";
/**
 * @param uId authenticated user id
 * @param barId id of the bar to see the meals
 */

/**
 * Class responsible for the service that serves to see the meals in bar
 */

export class SeeMealsService {

    /**
     * Method that allows you to see a meals from bar
     */
    async execute(barId: string, uId: string, role: string) {
        const seeMealsDBClient = createClient();

        const barExists = await checkBarExists(barId)
        if (!barExists) {
            throw new Error('Bar not exist')
        }

        if (role !== 'consumer') {
            const userBar = await getEmployeeBar(uId)

            if (userBar != barId) {
                throw new Error('Bars are not the same')
            }
        }
        const query = await seeMealsDBClient.query('SELECT * from Meals WHERE barId = $1 AND isdeleted = $2', [barId, false])



        const data = query["rows"]

        return { data, status: 200 }
    }
}