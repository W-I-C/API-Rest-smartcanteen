require('dotenv').config();
import { createClient } from "../../../config/db";


export class SeeTicketsHistoryService {
 
    async execute(uId:string) {


    
        const selectTIcket= createClient();
      
        const verifyUser=await selectTIcket.query('SELECT * from ticketTrade WHERE uId=$1',[uId])
        
        const data=verifyUser["rows"]

        return { data, status: 200 }



    }
}