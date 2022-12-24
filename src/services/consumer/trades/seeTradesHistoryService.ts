/**
 * @module seeTradesHistoryService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";

/**
 * Class responsible for the service that allows to see the history of consumer exchanges
 */

export class SeeTradesHistoryService {
  /**
     * Method that allows to see the history of consumer exchanges
     * @param uId authenticated user id
     */
    async execute(uId:string) { 
        console.log(uId)
        
        const selectTicket= createClient();
      
        const verifyUser=await selectTicket.query('SELECT * from ticketTrade WHERE uId=$1',[uId])
        
        const data=verifyUser["rows"]

        return { data, status: 200 }
    }
}