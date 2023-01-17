
require('dotenv').config();
import { createClient } from "../../../config/db";
import { getUserCampus } from "../../../validations/consumer/trades/seeTradesValidation";


export class GetCampusService {


  async execute(uId: string) {
    const mealsDetailDBClient = createClient();


    const query = await mealsDetailDBClient.query('SELECT campusid,name from campus')

    const data = query["rows"]

    await mealsDetailDBClient.end()

    return { data, status: 200 }
  }
}