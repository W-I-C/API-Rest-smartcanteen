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
exports.getUserCampus = void 0;
/**
 * @module seeTradesValidation
 */
const db_1 = require("../../../config/db");
/**
 * A user can see all the available exchanges on the campus he or she prefers.
 * To do this it is first necessary to get the user's preferred campus
 *
 * @param uId id of the user we want to know the preferred campus
 */
function getUserCampus(uId) {
    return __awaiter(this, void 0, void 0, function* () {
        const getUserCampusDBClient = (0, db_1.createClient)();
        const query = yield getUserCampusDBClient.query(`SELECT preferredcampus 
                                                    FROM users
                                                    WHERE uid = $1`, [uId]);
        return query['rows'][0]["preferredcampus"];
    });
}
exports.getUserCampus = getUserCampus;
//# sourceMappingURL=seeTradesValidation.js.map