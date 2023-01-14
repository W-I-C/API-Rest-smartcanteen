require('dotenv').config();
import { createClient } from "../../../config/db";
import { getUserCampus } from "../../../validations/consumer/trades/seeTradesValidation";

export class SeeMyTradesService {

    async execute(uId:string) { 
       
        const SeeMyTradesDBClient= createClient();

        const campusId = await getUserCampus(uId)

        const query=await SeeMyTradesDBClient.query(`SELECT tickets.ticketid, tickets.cartid, tickets.emissiondate, tickets.pickuptime, tickets.isfree, tickets.nencomenda, tickets.ticketamount, tickets.total, tickettrade.receptordecision, paymentmethods.name AS paymentmethod, states.name AS statename, ticketowner.name AS ownername, tradereceiver.name AS receivername, false AS isgeneraltrade, NULL AS generaltradeid
                                                    FROM tickettrade
                                                    JOIN tickets ON tickettrade.ticketid = tickets.ticketid
                                                    JOIN states ON tickets.stateid = states.stateid
                                                    JOIN users ticketowner ON tickets.uid = ticketowner.uid
                                                    JOIN users tradereceiver ON tickettrade.uid = tradereceiver.uid
                                                    LEFT JOIN paymentmethods ON tickettrade.paymentmethodid = paymentmethods.methodid
                                                    WHERE previousowner = $1 
                                                    AND tickettrade.isdeleted = $2
                                                    UNION
                                                    SELECT tickets.ticketid, tickets.cartid, tickets.emissiondate, tickets.pickuptime, tickets.isfree, tickets.nencomenda, tickets.ticketamount, tickets.total, NULL AS receptordecision, paymentmethods.name AS paymentmethod,  states.name AS statename, ticketowner.name AS ownername, tradereceiver.name AS receivername, true AS isgeneraltrade, generaltrades.generaltradeid
                                                    FROM generaltrades 
                                                    JOIN tickets ON generaltrades.ticketid = tickets.ticketid
                                                    JOIN states ON tickets.stateid = states.stateid
                                                    JOIN users ticketowner ON tickets.uid = ticketowner.uid
                                                    LEFT JOIN users tradereceiver ON generaltrades.uid = tradereceiver.uid
                                                    LEFT JOIN paymentmethods ON generaltrades.paymentmethodid = paymentmethods.methodid
                                                    WHERE previousowner = $1 
                                                    AND generaltrades.isdeleted = $2`,[uId, false])
        
        await SeeMyTradesDBClient.end()

        const data=query["rows"]

        return { data, status: 200 }
    }

}