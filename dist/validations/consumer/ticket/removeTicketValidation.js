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
exports.checkTicketExists = void 0;
/**
 * @module removeTicketValidation
 */
const db_1 = require("../../../config/db");
/**
 * To remove an order from the history, we need to check if the order the user
 * want to remove exists in the history of orders placed so far
 *
 * @param ticketId id of the ticket/order to remove
 */
function checkTicketExists(ticketId) {
    return __awaiter(this, void 0, void 0, function* () {
        const checkTicketExistsDBClient = (0, db_1.createClient)();
        const query = yield checkTicketExistsDBClient.query(`SELECT ticketid FROM tickets
                                                        WHERE ticketid = $1 AND ispickedup = $2 AND isdeleted = $3`, [ticketId, false, false]);
        return query['rows'].length != 0;
    });
}
exports.checkTicketExists = checkTicketExists;
//# sourceMappingURL=removeTicketValidation.js.map