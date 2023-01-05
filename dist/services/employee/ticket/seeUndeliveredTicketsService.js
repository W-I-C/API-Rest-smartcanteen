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
exports.SeeUndeliveredTicketsService = void 0;
/**
 * @module seeUndeliveredTicketsService
 */
require('dotenv').config();
const db_1 = require("../../../config/db");
const seeUndeliveredTicketValidation_1 = require("../../../validations/employee/ticket/seeUndeliveredTicketValidation");
/**
 * Class responsible for the service that serves to retrieve all the orders that the authenticated user has already placed
 */
class SeeUndeliveredTicketsService {
    /**
     * Method that allows you to retrieve all orders placed by the authenticated user
     * @param uId authenticated user id
     */
    execute(uId) {
        return __awaiter(this, void 0, void 0, function* () {
            const seeUndeliveredTicketsDBClient = (0, db_1.createClient)();
            const barId = yield (0, seeUndeliveredTicketValidation_1.getEmployeeBar)(uId);
            const query = yield seeUndeliveredTicketsDBClient.query(`SELECT ticketid, users.name, states.name AS stateName
                                                                FROM tickets
                                                                JOIN states ON tickets.stateid = states.stateid
                                                                JOIN users ON tickets.uid = users.uid
                                                                WHERE tickets.barid = $1`, [barId]);
            const data = query["rows"];
            return { data, status: 200 };
        });
    }
}
exports.SeeUndeliveredTicketsService = SeeUndeliveredTicketsService;
//# sourceMappingURL=seeUndeliveredTicketsService.js.map