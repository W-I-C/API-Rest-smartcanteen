require('dotenv').config();
import { createClient } from "../../../config/db";
import { getUserCampus } from "../../../validations/consumer/trades/seeTradesValidation";

export class SeeMyTradesService {

    async execute(uId:string) { 
       
        const SeeMyTradesDBClient= createClient();

        const campusId = await getUserCampus(uId)

        const query=await SeeMyTradesDBClient.query(`SELECT bar.name as barname,tickets.ticketid,users.name as ownername,states.name as statename,tickets.cartid,tickets.emissiondate,tickets.pickuptime,tickets.ticketamount, tickets.total,tickets.nencomenda
                                                    FROM campus 
                                                    JOIN bar on bar.campusid=campus.campusid
                                                    JOIN tickets on tickets.barid=bar.barid
                                                    JOIN tickettrade ON tickets.ticketid = tickettrade.ticketid
                                                    JOIN states ON tickets.stateid = states.stateid
                                                    JOIN users on users.uid = tickets.uid
                                                    WHERE campus.campusid = $1 AND tickettrade.previousowner = $2 AND tickets.isdeleted = $3
                                                    UNION
                                                    SELECT bar.name as barname,tickets.ticketid,users.name as ownername,states.name as statename,tickets.cartid,tickets.emissiondate,tickets.pickuptime,tickets.ticketamount, tickets.total,tickets.nencomenda
                                                    FROM campus 
                                                    JOIN bar on bar.campusid=campus.campusid
                                                    JOIN tickets on tickets.barid=bar.barid
                                                    JOIN generaltrades ON tickets.ticketid = generaltrades.ticketid
                                                    JOIN states ON tickets.stateid = states.stateid
                                                    JOIN users on users.uid = tickets.uid
                                                    WHERE campus.campusid = $1 AND generaltrades.previousowner = $2 AND tickets.isdeleted = $3`,[campusId, uId, false])
        
        await SeeMyTradesDBClient.end()

        const data=query["rows"]

        return { data, status: 200 }
    }

}