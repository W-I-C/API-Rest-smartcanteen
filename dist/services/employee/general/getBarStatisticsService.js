"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBarStatisticsService = void 0;
/**
 * @module getBarStatisticsService
 */
require('dotenv').config();
const db_1 = require("../../../config/db");
const editMealValidation_1 = require("../../../validations/employee/meal/editMealValidation");
/**
 * Class responsible for the service that serves to indicate that a meal cant be made
 */
class GetBarStatisticsService {
    /**
      * Method that allows you to indicate that a meal cant be made
      */
    execute(uid, barId) {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeBarId = yield (0, editMealValidation_1.getEmployeeBar)(uid);
            if (employeeBarId != barId) {
                throw new Error("Cannot get statistics from another bar");
            }
            const getBarStatisticsDBClient = (0, db_1.createClient)();
            const totalTicketsQuery = yield getBarStatisticsDBClient.query('SELECT Count(tickets.ticketid) as totalTicketsToday FROM tickets WHERE emissiondate >= current_date AND barid=$1;', [barId]);
            const deliveredTicketsQuery = yield getBarStatisticsDBClient.query(`SELECT Count(tickets.ticketid) as totalTicketsDelivered FROM tickets 
                                                                            JOIN states ON states.stateid = tickets.stateid
                                                                            WHERE emissiondate >= current_date AND states.name=$1 AND barid=$2;`, ['Entregue', barId]);
            const toDeliverTicketsQuery = yield getBarStatisticsDBClient.query(`SELECT Count(tickets.ticketid) as totalTicketsToDeliver FROM tickets 
                                                                            JOIN states ON states.stateid = tickets.stateid
                                                                            WHERE emissiondate >= current_date AND states.name<>$1 AND barid=$2;`, ['Entregue', barId]);
            const ticketsTradedQuery = yield getBarStatisticsDBClient.query(`SELECT Count(tickettrade."tradeId") as totalTradesToday FROM tickettrade 
                                                                        JOIN tickets ON tickets.ticketid = tickettrade.ticketid
                                                                        WHERE confirmationdate >= current_date AND barid=$1;`, [barId]);
            const statistics = {
                totalTickets: Number(totalTicketsQuery['rows'][0]['totalticketstoday']),
                deliveredTickets: Number(deliveredTicketsQuery['rows'][0]['totalticketsdelivered']),
                toDeliverTickets: Number(toDeliverTicketsQuery['rows'][0]['totalticketstodeliver']),
                tradedTickets: Number(ticketsTradedQuery['rows'][0]['totaltradestoday'])
            };
            return { data: statistics, status: 200 };
        });
    }
}
exports.GetBarStatisticsService = GetBarStatisticsService;
//# sourceMappingURL=getBarStatisticsService.js.map