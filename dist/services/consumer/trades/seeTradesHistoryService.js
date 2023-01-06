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
exports.SeeTradesHistoryService = void 0;
/**
 * @module seeTradesHistoryService
 */
require('dotenv').config();
const db_1 = require("../../../config/db");
/**
 * Class responsible for the service that allows to see the history of consumer exchanges
 */
class SeeTradesHistoryService {
    /**
       * Method that allows to see the history of consumer exchanges
       * @param uId authenticated user id
       */
    execute(uId) {
        return __awaiter(this, void 0, void 0, function* () {
            const selectTicket = (0, db_1.createClient)();
            const verifyUser = yield selectTicket.query('SELECT ticketid,isconfirmed,proposaldate,confirmationdate,receptordecision,isdeleted FROM ticketTrade WHERE uId=$1 AND isdeleted = $2', [uId, false]);
            const data = verifyUser["rows"];
            return { data, status: 200 };
        });
    }
}
exports.SeeTradesHistoryService = SeeTradesHistoryService;
//# sourceMappingURL=seeTradesHistoryService.js.map