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
exports.GeneralTicketTradeService = void 0;
/**
 * @module generalTicketTradeService
 */
require('dotenv').config();
const db_1 = require("../../../config/db");
/**
 * Class responsible for the service that serves to expose ticket for trading
 */
class GeneralTicketTradeService {
    /**
     * Method that allows the authenticated user to expose his order for trading
     *
     * @param uId authenticated user id
     * @param ticketId id of the order
     */
    execute(uId, ticketId) {
        return __awaiter(this, void 0, void 0, function* () {
            const renameTicketTradeDBClient = (0, db_1.createClient)();
            const getTicketQuery = yield renameTicketTradeDBClient.query(`SELECT * FROM tickets WHERE ticketid = $1 AND isdeleted = $2`, [ticketId, false]);
            const getTicketTrades = yield renameTicketTradeDBClient.query(`SELECT * FROM tickettrade WHERE ticketid = $1 AND receptordecision = $2`, [ticketId, 1]);
            if (getTicketQuery['rows'].length == 0) {
                throw new Error('Order does not exist!');
            }
            const ticket = getTicketQuery.rows[0];
            if (ticket['istrading']) {
                throw new Error('Order already trading!');
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
            yield renameTicketTradeDBClient.query(`UPDATE tickets SET isTrading=$1 WHERE ticketid=$2`, [true, ticketId]);
            return { data: { msg: 'Trade exposed successfully' }, status: 200 };
        });
    }
}
exports.GeneralTicketTradeService = GeneralTicketTradeService;
//# sourceMappingURL=generalTicketTradeService.js.map