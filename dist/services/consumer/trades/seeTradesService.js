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
exports.SeeTradesService = void 0;
/**
 * @module seeTradesService
 */
require('dotenv').config();
const db_1 = require("../../../config/db");
/**
 * Class responsible for the service that allows you to see the available trades
 */
class SeeTradesService {
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const selectTicket = (0, db_1.createClient)();
            const verifyUser = yield selectTicket.query('SELECT * from tickets WHERE istrading=$1 AND ispickedup=$2', [true, false]);
            const data = verifyUser["rows"];
            return { data, status: 200 };
        });
    }
}
exports.SeeTradesService = SeeTradesService;
//# sourceMappingURL=seeTradesService.js.map