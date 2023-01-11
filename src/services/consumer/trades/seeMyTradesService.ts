require('dotenv').config();
import { createClient } from "../../../config/db";

export class SeeMyTradesService {

    async execute(uId:string) { 
       
        const SeeMyTradesDBClient= createClient();
      
        // const query=await SeeMyTradesDBClient.query(`SELECT tickets.ticketid, tickets.nencomenda, tickets.ticketamount, tickets.total, states.name
        //                                         FROM tickettrade 
        //                                         JOIN tickets ON tickettrade.ticketid = tickets.ticketid
        //                                         JOIN states ON tickets.stateid = states.stateid
        //                                         WHERE tickettrade.uid = $1 AND tickettrade.isdeleted = $2 AND tickettrade.isconfirmed = $3 AND tickettrade.receptordecision = $4`,[uId, false, true, 1])

        const query=await SeeMyTradesDBClient.query(`SELECT tickets.ticketid, tickets.nencomenda, tickets.ticketamount, tickets.total, states.name
                                                 FROM tickets 
                                                 JOIN tickets ON tickettrade.ticketid = tickets.ticketid
                                                 JOIN states ON tickets.stateid = states.stateid
                                                 WHERE tickettrade.uid = $1 AND tickettrade.isdeleted = $2 AND tickettrade.isconfirmed = $3 AND tickettrade.receptordecision = $4`,[uId, false, true, 1])
        
        const data=query["rows"]

        return { data, status: 200 }
    }

}