
require('dotenv').config();
import { createClient } from "../../../config/db";

export class SeeDirectTradePaymentMethodService {
  async execute(uId: string, tradeId: string) {

    const seeDirectTradePaymentMethodDBClient = createClient();

    const query = await seeDirectTradePaymentMethodDBClient.query(`SELECT paymentmethodid AS methodid, paymentmethods.name 
                                                                FROM tickettrade
                                                                JOIN paymentmethods ON tickettrade.paymentmethodid = paymentmethods.methodid
                                                                WHERE tradeId = $1`, [tradeId])

    const data = query["rows"][0]


    await seeDirectTradePaymentMethodDBClient.end()

    return { data: data, status: 200 }
  }
}