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
exports.checkBarExists = exports.getUserRole = void 0;
/**
 * @module seeMealsValidation
 */
const db_1 = require("../../../config/db");
/**
 * Allows to get the role of the authenticated user
 *
 * @param uId id of the authenticated user
 */
function getUserRole(uId) {
    return __awaiter(this, void 0, void 0, function* () {
        const getUserRoleDBClient = (0, db_1.createClient)();
        const query = yield getUserRoleDBClient.query(`SELECT roleid FROM users
                                                        WHERE uid = $1`, [uId]);
        return query['rows'][0]["roleid"];
    });
}
exports.getUserRole = getUserRole;
/**
 * Allows to check if the bar exists
 *
 * @param barId id of the bar
 */
function checkBarExists(barId) {
    return __awaiter(this, void 0, void 0, function* () {
        const getUserRoleDBClient = (0, db_1.createClient)();
        const query = yield getUserRoleDBClient.query(`SELECT barid FROM bar
                                                        WHERE barid = $1`, [barId]);
        return query['rows'].length != 0;
    });
}
exports.checkBarExists = checkBarExists;
//# sourceMappingURL=seeMealsValidation.js.map