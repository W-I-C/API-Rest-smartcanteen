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

    const query = await getBarMenuDBClient.query('SELECT * from Meals WHERE barId = $1 AND isdeleted = $2', [barId, false])

    await getBarMenuDBClient.end()

    return { data: query['rows'], status: 200 }
  }
}