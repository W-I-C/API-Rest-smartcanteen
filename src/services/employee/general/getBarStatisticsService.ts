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
    const totalTicketsQuery = await getBarStatisticsDBClient.query('SELECT Count(tickets.ticketid) as totalTicketsToday FROM tickets WHERE emissiondate >= current_date AND barid=$1;', [barId])
    const deliveredTicketsQuery = await getBarStatisticsDBClient.query(`SELECT Count(tickets.ticketid) as totalTicketsDelivered FROM tickets 
                                                                            JOIN states ON states.stateid = tickets.stateid
                                                                            WHERE emissiondate >= current_date AND states.name=$1 AND barid=$2;`, ['Entregue', barId])
    const toDeliverTicketsQuery = await getBarStatisticsDBClient.query(`SELECT Count(tickets.ticketid) as totalTicketsToDeliver FROM tickets 
                                                                            JOIN states ON states.stateid = tickets.stateid
                                                                            WHERE emissiondate >= current_date AND states.name<>$1 AND barid=$2;`, ['Entregue', barId])
    const ticketsTradedQuery = await getBarStatisticsDBClient.query(`SELECT Count(tickettrade."tradeId") as totalTradesToday FROM tickettrade 
                                                                        JOIN tickets ON tickets.ticketid = tickettrade.ticketid
                                                                        WHERE confirmationdate >= current_date AND barid=$1;`, [barId])

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