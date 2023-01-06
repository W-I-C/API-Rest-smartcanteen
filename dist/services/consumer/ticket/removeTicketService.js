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
exports.RemoveTicketService = void 0;
/**
 * @module removeTicketService
 */
require('dotenv').config();
const db_1 = require("../../../config/db");
const dbHelpers_1 = require("../../../helpers/dbHelpers");
/**
 * Class responsible for the service that serves to remove one order of the authenticated user
 */
class RemoveTicketService {
    /**
     * Method that allows the authenticated user to remove a order
     *
     * @param uId authenticated user id
     * @param ticketId id of the order to be removed from favorites
     */
    execute(uId, ticketId) {
        return __awaiter(this, void 0, void 0, function* () {
            const removeTicketDBClient = (0, db_1.createClient)();
            const getTicketQuery = yield removeTicketDBClient.query(`SELECT * FROM tickets WHERE ticketid = $1 AND isDeleted = $2`, [ticketId, false]);
            const getTicketTrades = yield removeTicketDBClient.query(`SELECT * FROM tickettrade 
                                                                    WHERE ticketid = $1 AND receptordecision = $2`, [ticketId, 1]);
            if (getTicketQuery['rows'].length == 0) {
                throw new Error('Order does not exist!');
            }
            const ticket = getTicketQuery.rows[0];
            if (getTicketTrades['rows'].length != 0) {
                const trade = getTicketTrades['rows'][0];
                if (trade['uid'] != uId) {
                    throw new Error('Not your Order!');
                }
            }
            else if (ticket['uid'] != uId) {
                throw new Error('Not your Order!');
            }
            if (ticket['stateid'] != (yield (0, dbHelpers_1.getNotStartedStatusId)())) {
                throw new Error('Order Already in preperation!');
            }
            yield removeTicketDBClient.query(`UPDATE tickets SET isdeleted=$1 WHERE ticketid=$2`, [true, ticketId]);
            return { data: { msg: 'Order removed sucessfuly' }, status: 200 };
        });
    }
}
exports.RemoveTicketService = RemoveTicketService;
//# sourceMappingURL=removeTicketService.js.map