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
const removeTicketValidation_1 = require("../../../validations/consumer/ticket/removeTicketValidation");
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
            const ticketIdExists = yield (0, removeTicketValidation_1.checkTicketExists)(ticketId);
            if (!ticketIdExists) {
                throw new Error('Order does not exists');
            }
            // TODO: ao remover tenho que remover de todas as tabelas que tenham este ticketid
            // TODO: isDeleted em vez de removewr direto
            const removeTicketDBClient = (0, db_1.createClient)();
            yield removeTicketDBClient.query(`DELETE FROM tickets
                                            WHERE uid = $1 AND ticketid = $2`, [uId, ticketId]);
            yield removeTicketDBClient.query(`DELETE FROM tickettrade
                                        WHERE ticketid = $1`, [ticketId]);
            yield removeTicketDBClient.query(`DELETE FROM ticketlogs
                                        WHERE ticketid = $1`, [ticketId]);
            yield removeTicketDBClient.query(`DELETE FROM ticketinvoice
                                        WHERE ticketid = $1`, [ticketId]);
            return { msg: 'Order removed sucessfuly', status: 200 };
        });
    }
}
exports.RemoveTicketService = RemoveTicketService;
//# sourceMappingURL=removeTicketService.js.map