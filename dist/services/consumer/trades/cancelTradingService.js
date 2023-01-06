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
exports.CancelTradingService = void 0;
/**
 * @module generalTicketTradeService
 */
require('dotenv').config();
const db_1 = require("../../../config/db");
const dbHelpers_1 = require("../../../helpers/dbHelpers");
/**
 * Class responsible for the service that serves to cancel trading for a ticket
 */
class CancelTradingService {
    /**
     * Method that allows the authenticated user to cancel is ticket trading
     *
     * @param uId authenticated user id
     * @param ticketId id of the order
     */
    execute(uId, ticketId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cancelTicketTradeDBClient = (0, db_1.createClient)();
            const getTicketQuery = yield cancelTicketTradeDBClient.query(`SELECT * FROM tickets WHERE ticketid = $1 AND isdeleted = $2`, [ticketId, false]);
            const getTicketTrades = yield cancelTicketTradeDBClient.query(`SELECT * FROM tickettrade WHERE ticketid = $1 AND receptordecision = $2`, [ticketId, 1]);
            const userName = yield (0, dbHelpers_1.getUserName)(uId);
            if (getTicketQuery['rows'].length == 0) {
                throw new Error('Order does not exist!');
            }
            const ticket = getTicketQuery.rows[0];
            if (!ticket['istrading']) {
                throw new Error('Order not trading!');
            }
            if (getTicketTrades['rows'].length != 0) {
                const trade = getTicketTrades['rows'][0];
                if (trade['uid'] != uId) {
                    throw new Error('Not your Order!');
                }
            }
            else if (ticket['uid'] != uId) {
                throw new Error('Not your Order!');
            }
            yield cancelTicketTradeDBClient.query(`UPDATE tickets SET istrading=$1, isdirecttrade=$2 WHERE ticketid=$3`, [false, false, ticketId]);
            yield cancelTicketTradeDBClient.query(`UPDATE tickettrade SET isDeleted=$1 WHERE ticketid = $2`, [true, ticketId]);
            if (ticket['isdirecttrade']) {
                const users = yield cancelTicketTradeDBClient.query(`SELECT * FROM tickettrade WHERE ticketid=$1 AND receptordecision is NULL`, [ticketId]);
                const date = new Date();
                const description = `${userName} canceled the trade proposal`;
                users['rows'].forEach(function (user) {
                    return __awaiter(this, void 0, void 0, function* () {
                        yield cancelTicketTradeDBClient.query(`INSERT INTO notifications(date,receiverid, senderid,description,istradeproposal) VALUES ($1,$2,$3,$4,$5)`, [date, user['uid'], uId, description, false]);
                    });
                });
            }
            return { data: { msg: 'Trade canceled successfully' }, status: 200 };
        });
    }
}
exports.CancelTradingService = CancelTradingService;
//# sourceMappingURL=cancelTradingService.js.map