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
       
        const selectTicket= createClient();
      
        const verifyUser=await selectTicket.query('SELECT ticketid,isconfirmed,proposaldate,confirmationdate,receptordecision,isdeleted FROM ticketTrade WHERE uId=$1 AND isdeleted = $2',[uId, false])
        
        const data=verifyUser["rows"]

        return { data, status: 200 }
    }

}