/**
 * @module canBeMadeService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { getEmployeeBar } from "../../../validations/employee/meal/editMealValidation";

/**
 * Class responsible for the service that serves to indicate that a meal cant be made
 */

export class CanBeMadeService {
  /**
    * Method that allows you to indicate that a meal cant be made
    */
  async execute(uid: string, mealId: string, status: boolean) {

    const barId = await getEmployeeBar(uid);

    const canBeMadeDBClient = createClient();

    const mealExistQuery = await canBeMadeDBClient.query('SELECT * from Meals WHERE mealid=$1', [mealId])

    if (mealExistQuery.rowCount == 0) {
      return { data: { msg: "Meal doens't exist" }, status: 500 }
    }

    if (mealExistQuery.rows[0]['barid'] != barId) {
      return { data: { msg: "Not from the same bar" }, status: 500 }
    }

    await canBeMadeDBClient.query('UPDATE meals SET canbemade=$1 WHERE mealid=$2', [status, mealId])

    await canBeMadeDBClient.end()

    return { data: { msg: "Meal updated" }, status: 200 }

  }
}