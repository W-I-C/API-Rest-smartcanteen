require('dotenv').config();
import { createClient } from "../../../config/db";


export class SeeTicketsService {
 
    async execute() {


    
        const selectTIcket= createClient();
      
        const verifyUser=await selectTIcket.query('SELECT * from tickets WHERE istrading=$1 AND ispickedup=$2',[false,false])
        
        const data=verifyUser["rows"]

        return { data, status: 200 }



    }
}