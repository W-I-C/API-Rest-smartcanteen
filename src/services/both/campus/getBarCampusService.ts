/**
 * @module getCampusBarsService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";


/**
 * Class responsible for the service that serves to get the campus bars
 */
export class GetBarCampusService {
  /**
  * Method that allows you to get the campus bars
  * @param uId authenticated user id
  */

  async execute(uId: string,campusId:string) {
    const mealsDetailDBClient = createClient();


    const query = await mealsDetailDBClient.query('SELECT * from bar WHERE campusid=$1', [campusId])

    const data = query["rows"]


    return { data, status: 200 }
  }
}