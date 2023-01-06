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
exports.checkUserIsReceiver = exports.checkTradeExists = void 0;
/**
 * @module acceptTradeValidation
 */
const db_1 = require("../../../config/db");
/**
 * In order to accept an exchange proposed by another user,
 * it is first necessary to check if the exchange exists (if it has been proposed)
 * Allows to check if the trade exists
 *
 * @param ticketId id of the ticket/order to accept the trade
 */
function checkTradeExists(ticketId) {
    return __awaiter(this, void 0, void 0, function* () {
        const checkTradeExistsDBClient = (0, db_1.createClient)();
        const query = yield checkTradeExistsDBClient.query(`SELECT ticketid FROM tickettrade
                                                        WHERE ticketid = $1 AND isdeleted = $2`, [ticketId, false]);
        return query['rows'].length != 0;
    });
}
exports.checkTradeExists = checkTradeExists;
/**
 * A direct exchange takes place between a sender and a receiver.
 * It is first necessary to verify that the authenticated person is the recipient of the proposed exchange
 *
 * @param uId id of the authenticated user (the receiver)
 * @param ticketId id of the ticket/order to accept the trade
 */
function checkUserIsReceiver(uId, ticketId) {
    return __awaiter(this, void 0, void 0, function* () {
        const checkUserIsReceiverDBClient = (0, db_1.createClient)();
        const query = yield checkUserIsReceiverDBClient.query(`SELECT ticketid FROM tickettrade
                                                        WHERE uid = $1 AND ticketid = $2`, [uId, ticketId]);
        return query['rows'].length != 0;
    });
}
exports.checkUserIsReceiver = checkUserIsReceiver;
//# sourceMappingURL=acceptTradeValidation.js.map