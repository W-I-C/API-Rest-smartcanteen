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
 * @module acceptTradeService
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
            let description;
            if (receptorDecision == 0) {
                description = "The trade proposal was refused";
            }
            else {
                description = "The trade proposal was accepted";
            }
            if (tradeExists && userIsReceiver) {
                const queryOwner = yield acceptTradeDBClient.query(`SELECT uid FROM tickets WHERE ticketid = $1`, [ticketId]);
                const ticketOwner = queryOwner["rows"][0]["uid"];
                yield acceptTradeDBClient.query(`UPDATE tickettrade
                                            SET isconfirmed = $1, confirmationdate = $2, receptordecision = $3   
                                            WHERE uid = $4 AND ticketid = $5`, [isConfirmed, confirmationDate, receptorDecision, uId, ticketId]);
                const query = yield acceptTradeDBClient.query(`SELECT isconfirmed, confirmationdate, receptordecision
                                                    FROM tickettrade 
                                                    WHERE uid = $1 AND ticketid = $2`, [uId, ticketId]);
                yield acceptTradeDBClient.query(`INSERT INTO notifications (date, receiverid, senderid, description)
                                            VALUES ($1, $2, $3, $4)`, [confirmationDate, ticketOwner, uId, description]);
                const data = query["rows"][0];
                return { data, status: 200 };
            }
            else {
                return { msg: "Invalid Data", status: 500 };
            }
        });
    }
}
exports.AcceptTradeService = AcceptTradeService;
//# sourceMappingURL=acceptTradeService.js.map