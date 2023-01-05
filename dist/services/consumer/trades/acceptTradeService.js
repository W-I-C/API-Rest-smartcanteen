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
exports.AcceptTradeService = void 0;
/**
 * @module AcceptTradeService
 */
require('dotenv').config();
const db_1 = require("../../../config/db");
const acceptTradeValidation_1 = require("../../../validations/consumer/trades/acceptTradeValidation");
/**
 * Class responsible for the service that serves to accept the trade
 */
class AcceptTradeService {
    /**
     * Method that allows editing the data regarding the acceptance of the trade
     */
    execute({ uId, ticketId, receptorDecision }) {
        return __awaiter(this, void 0, void 0, function* () {
            const acceptTradeDBClient = (0, db_1.createClient)();
            const tradeExists = yield (0, acceptTradeValidation_1.checkTradeExists)(ticketId);
            const userIsReceiver = yield (0, acceptTradeValidation_1.checkUserIsReceiver)(uId, ticketId);
            const isConfirmed = true;
            const confirmationDate = new Date();
            // TODO: se receptorDecisison já estiver a 1 pode se editar para 0?
            // TODO: se receptorDecisison já estiver a 1 pode se editar? o isConfirmed é sempre true?
            if (tradeExists && userIsReceiver) {
                yield acceptTradeDBClient.query(`UPDATE tickettrade
                                                        SET isconfirmed = $1, confirmationdate = $2, receptordecision = $3   
                                                        WHERE uid = $4 AND ticketid = $5`, [isConfirmed, confirmationDate, receptorDecision, uId, ticketId]);
                const query = yield acceptTradeDBClient.query(`SELECT isconfirmed, confirmationdate, receptordecision
                                                    FROM tickettrade 
                                                    WHERE uid = $1 AND ticketid = $2`, [uId, ticketId]);
                const data = query["rows"][0];
                return { data, status: 200 };
            }
            else {
                return { msg: "Invalid Data", status: 404 };
            }
            // TODO: notificação a avisar o utilizador que propos a troca (que detem o ticket) rque a troca foi aceite ou não pelo recetor
        });
    }
}
exports.AcceptTradeService = AcceptTradeService;
//# sourceMappingURL=acceptTradeService.js.map