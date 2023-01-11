/**
 * @module getCampusBarsService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { getUserCampus } from "../../../validations/consumer/trades/seeTradesValidation";

/**
 * Class responsible for the service that serves to get the campus bars
 */
export class GetCampusBarsService {
  /**
  * Method that allows you to get the campus bars
  * @param uId authenticated user id
  */

  async execute(uId: string) {
    const mealsDetailDBClient = createClient();

    const campusId = await getUserCampus(uId)

    const query = await mealsDetailDBClient.query('SELECT barid,name from bar WHERE campusid=$1', [campusId])

    const data = query["rows"]
    return { data, status: 200 }
  }
}