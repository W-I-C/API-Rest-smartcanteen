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
exports.SeeMyTradesService = void 0;
require('dotenv').config();
const db_1 = require("../../../config/db");
class SeeMyTradesService {
    execute(uId) {
        return __awaiter(this, void 0, void 0, function* () {
            const SeeMyTradesDBClient = (0, db_1.createClient)();
            const query = yield SeeMyTradesDBClient.query(`SELECT tickets.ticketid, tickets.nencomenda, tickets.ticketamount, tickets.total, states.name
                                                FROM tickettrade 
                                                JOIN tickets ON tickettrade.ticketid = tickets.ticketid
                                                JOIN states ON tickets.stateid = states.stateid
                                                WHERE tickettrade.uid = $1 AND tickettrade.isdeleted = $2 AND tickettrade.isconfirmed = $3 AND tickettrade.receptordecision = $4`, [uId, false, true, 1]);
            const data = query["rows"];
            return { data, status: 200 };
        });
    }
}
exports.SeeMyTradesService = SeeMyTradesService;
//# sourceMappingURL=seeMyTradesService.js.map