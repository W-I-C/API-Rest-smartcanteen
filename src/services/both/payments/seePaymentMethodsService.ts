require('dotenv').config();
import { createClient } from "../../../config/db";
import { getUserId, getUserName, getUserRole } from "../../../helpers/dbHelpers";

export class SeePaymentMehodsService {

  async execute() {

    const directTicketTradeDBClient = createClient();
    const query = await directTicketTradeDBClient.query("SELECT * FROM paymentmethods");
    
    const data = query["rows"]

    await directTicketTradeDBClient.end()

    return { data: data, status: 200 }
  }
}