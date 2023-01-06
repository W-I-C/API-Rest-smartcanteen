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
exports.getEmployeeBar = void 0;
/**
 * @module seeUndeliveredTicketValidation
 */
const db_1 = require("../../../config/db");
/**
 * An employee has access to a list of orders placed by different students that have not yet been delivered.
 * These orders are placed for a certain bar and so this function allows you to get the employee's bar
 *
 * @param uId id of the authenticated employee who wants to see the list of orders placed
 */
function getEmployeeBar(uId) {
    return __awaiter(this, void 0, void 0, function* () {
        const checkMealExistsDBClient = (0, db_1.createClient)();
        const query = yield checkMealExistsDBClient.query(`SELECT preferredbar FROM users
                                                        WHERE uid = $1`, [uId]);
        return query['rows'][0]["preferredbar"];
    });
}
exports.getEmployeeBar = getEmployeeBar;
//# sourceMappingURL=seeUndeliveredTicketValidation.js.map