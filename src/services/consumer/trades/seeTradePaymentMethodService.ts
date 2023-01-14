
require('dotenv').config();
import { createClient } from "../../../config/db";
import { getDeliveredStatusId, getUserName } from "../../../helpers/dbHelpers";
import { getUserCampus } from "../../../validations/consumer/trades/seeTradesValidation";

export class SeeTradePaymentMethodService {
  async execute(uId: string, generalTradeId: string) {

    const seeTradePaymentMethodDBClient = createClient();

    const query = await seeTradePaymentMethodDBClient.query(`SELECT paymentmethodid AS methodid, paymentmethods.name 
                                                        FROM generaltrades
                                                        JOIN paymentmethods ON generaltrades.paymentmethodid = paymentmethods.methodid
                                                        WHERE generaltradeid = $1`, [generalTradeId])

    const data = query["rows"][0]
    console.log(query["rows"][0])

    await seeTradePaymentMethodDBClient.end()

    return { data: data, status: 200 }
  }
}