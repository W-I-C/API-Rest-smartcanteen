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
exports.SeeTradesService = void 0;
/**
 * @module seeTradesService
 */
require('dotenv').config();
const db_1 = require("../../../config/db");
/**
 * Class responsible for the service that allows you to see the available trades
 */
class SeeTradesService {
    /**
    * Method that allows to see all the tickets that are available to trade in the campus of the user
    * @param uId authenticated user id
    */
    execute(uId, campusid) {
        return __awaiter(this, void 0, void 0, function* () {
            const seeTradesAvailableDBClient = (0, db_1.createClient)();
            const verifyUser = yield seeTradesAvailableDBClient.query(`SELECT * FROM campus
                                                        JOIN bar on bar.campusid=campus.campusid
                                                        JOIN tickets on tickets.barid=bar.barid
                                                        LEFT JOIN tickettrade on tickets.ticketid=tickettrade.ticketid
                                                        WHERE campus.campusid=$1 
                                                        AND tickets.istrading = true 
                                                        AND tickets.isdirecttrade=false
                                                        AND tickettrade.receptordecision is NULL`, [campusid]);
            const data = verifyUser["rows"];
            return { data, status: 200 };
        });
    }
}
exports.SeeTradesService = SeeTradesService;
//# sourceMappingURL=seeTradesService.js.map