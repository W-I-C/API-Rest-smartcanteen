/**
 * @module getBarMenuService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { getEmployeeBar } from "../../../validations/employee/meal/editMealValidation";

/**
 * Class responsible for the service that serves to get bar menu
 */

export class GetBarMenuService {
  /**
    * Method that allows you to get bar menu
    */
  async execute(uid: string) {

    const barId = await getEmployeeBar(uid);
    const getBarMenuDBClient = createClient();

    const query = await getBarMenuDBClient.query(`SELECT meals.mealid,meals.barid,meals.name,meals.preparationtime,meals.description,meals.cantakeaway,meals.price,meals.canbemade,mealimages.url from meals 
                                                    LEFT JOIN mealimages ON mealimages.mealid = meals.mealid
                                                    WHERE meals.barId = $1 AND meals.isdeleted = $2`, [barId, false])

    await getBarMenuDBClient.end()

    return { data: query['rows'], status: 200 }
  }
}
