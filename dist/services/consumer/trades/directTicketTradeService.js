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
exports.DirectTicketTradeService = void 0;
/**
 * @module directTicketTradeService
 */
require('dotenv').config();
const db_1 = require("../../../config/db");
const dbHelpers_1 = require("../../../helpers/dbHelpers");
/**
 * Class responsible for the service that serves to make a direct trade
 */
class DirectTicketTradeService {
    /**
     * Method that allows the authenticated user to make a direct trade
     *
     * @param uId authenticated user id
     * @param receiverid id of the user that is going to receive the trade proposal
     * @param ticketId id of the order
     * @param receiverid id of the user that the trade is going to go
     */
    execute(uId, receiverid, ticketId) {
        return __awaiter(this, void 0, void 0, function* () {
            const directTicketTradeDBClient = (0, db_1.createClient)();
            const getTicketQuery = yield directTicketTradeDBClient.query(`SELECT * FROM tickets WHERE ticketid = $1 AND isdeleted = $2`, [ticketId, false]);
            const getTicketTrades = yield directTicketTradeDBClient.query(`SELECT * FROM tickettrade 
                                                                    WHERE ticketid = $1 AND receptordecision = $2`, [ticketId, 1]);
            const userName = yield (0, dbHelpers_1.getUserName)(uId);
            if (userName === undefined) {
                throw new Error('User does not exist');
            }
            const receiverRole = yield (0, dbHelpers_1.getUserRole)(receiverid);
            if (receiverRole != 'consumer') {
                throw new Error('Can only trade with another consumer');
            }
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
            const getTradesTicketToReceiver = yield directTicketTradeDBClient.query(`SELECT * FROM tickettrade 
    WHERE ticketid = $1 AND uid = $2`, [ticketId, receiverid]);
            if (getTradesTicketToReceiver['rows'].length != 0) {
                throw new Error('Trade proposal to this user already sent!');
            }
            const description = `${userName} sent you a trade proposal`;
            yield directTicketTradeDBClient.query(`UPDATE tickets SET istrading=$1 WHERE ticketid=$2`, [true, ticketId]);
            const date = new Date();
            yield directTicketTradeDBClient.query(`INSERT INTO notifications(date,receiverid, senderid,description,istradeproposal) VALUES ($1,$2,$3,$4,$5)`, [date, receiverid, uId, description, true]);
            yield directTicketTradeDBClient.query(`INSERT INTO tickettrade(ticketid,uid,proposaldate) VALUES ($1,$2,$3)`, [ticketId, receiverid, date]);
            return { data: { msg: 'Trade proposal done successfully' }, status: 200 };
        });
    }
}
exports.DirectTicketTradeService = DirectTicketTradeService;
//# sourceMappingURL=directTicketTradeService.js.map