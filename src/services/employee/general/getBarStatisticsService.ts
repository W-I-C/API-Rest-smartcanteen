/**
 * @module getBarStatisticsService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { getEmployeeBar } from "../../../validations/employee/meal/editMealValidation";

/**
 * Class responsible for the service that serves to get bar statistics
 */

export class GetBarStatisticsService {
  /**
    * Method that allows you to get bar statistics
    */
  async execute(uid: string) {

    const barId = await getEmployeeBar(uid);

    const getBarStatisticsDBClient = createClient();



    const totalTicketsQuery = await getBarStatisticsDBClient.query('SELECT Count(tickets.ticketid) as totalTicketsToday FROM tickets WHERE Date(tickets.emissiondate) = CURRENT_DATE AND barid=$1;', [barId])
    const deliveredTicketsQuery = await getBarStatisticsDBClient.query(`SELECT Count(tickets.ticketid) as totalTicketsDelivered FROM tickets 
                                                                            JOIN states ON states.stateid = tickets.stateid
                                                                            WHERE Date(tickets.emissiondate) = CURRENT_DATE AND states.name=$1 AND barid=$2;`, ['Entregue', barId])
    const toDeliverTicketsQuery = await getBarStatisticsDBClient.query(`SELECT Count(tickets.ticketid) as totalTicketsToDeliver FROM tickets 
                                                                            JOIN states ON states.stateid = tickets.stateid
                                                                            WHERE Date(tickets.emissiondate) = CURRENT_DATE AND states.name<>$1 AND barid=$2;`, ['Entregue', barId])
    const ticketsTradedQuery = await getBarStatisticsDBClient.query(`SELECT count(ticketid) AS totaltradestoday FROM (SELECT tickets.ticketid, tickets.cartid, tickets.emissiondate, tickets.pickuptime, tickets.isfree, tickets.nencomenda, tickets.ticketamount, tickets.total, tickettrade.receptordecision, paymentmethods.name AS paymentmethod, states.name AS statename, ticketowner.name AS ownername, tradereceiver.name AS receivername, false AS isgeneraltrade, NULL AS generaltradeid
                                                FROM tickettrade
                                                JOIN tickets ON tickettrade.ticketid = tickets.ticketid
                                                JOIN states ON tickets.stateid = states.stateid
                                                JOIN users ticketowner ON tickets.uid = ticketowner.uid
                                                JOIN users tradereceiver ON tickettrade.uid = tradereceiver.uid
                                                LEFT JOIN paymentmethods ON tickettrade.paymentmethodid = paymentmethods.methodid
                                                WHERE Date(tickets.emissiondate) = CURRENT_DATE AND tickettrade.isdeleted = $2 AND tickets.barid = $1 AND tradereceiver.name is NOT NULL
                                                UNION
                                                SELECT tickets.ticketid, tickets.cartid, tickets.emissiondate, tickets.pickuptime, tickets.isfree, tickets.nencomenda, tickets.ticketamount, tickets.total, NULL AS receptordecision, paymentmethods.name AS paymentmethod,  states.name AS statename, ticketowner.name AS ownername, tradereceiver.name AS receivername, true AS isgeneraltrade, generaltrades.generaltradeid
                                                FROM generaltrades 
                                                JOIN tickets ON generaltrades.ticketid = tickets.ticketid
                                                JOIN states ON tickets.stateid = states.stateid
                                                JOIN users ticketowner ON tickets.uid = ticketowner.uid
                                                LEFT JOIN users tradereceiver ON generaltrades.uid = tradereceiver.uid
                                                LEFT JOIN paymentmethods ON generaltrades.paymentmethodid = paymentmethods.methodid
                                                WHERE  Date(tickets.emissiondate) = CURRENT_DATE AND generaltrades.isdeleted = $2 AND tickets.barid = $1 AND tradereceiver.name is NOT NULL) A `, [barId, false])



    const statistics = {
      totalTickets: Number(totalTicketsQuery['rows'][0]['totalticketstoday']),
      deliveredTickets: Number(deliveredTicketsQuery['rows'][0]['totalticketsdelivered']),
      toDeliverTickets: Number(toDeliverTicketsQuery['rows'][0]['totalticketstodeliver']),
      tradedTickets: Number(ticketsTradedQuery['rows'][0]['totaltradestoday'])
    }

    await getBarStatisticsDBClient.end()

    return { data: statistics, status: 200 }
  }
}