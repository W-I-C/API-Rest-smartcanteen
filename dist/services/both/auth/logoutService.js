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
exports.LogoutService = void 0;
/**
 * @module logoutService
 */
const db_1 = require("../../../config/db");
/**
 * class responsible for logging out
 */
class LogoutService {
    /**
   * Method that allows you to logout
   * @param uid role id
   * @param sessionToken psession token
   */
    execute(uid, sessionToken) {
        return __awaiter(this, void 0, void 0, function* () {
            // obter dados do user
            const logoutDBClient = (0, db_1.createClient)();
            const query = yield logoutDBClient.query(`UPDATE users SET "refreshtoken"='' WHERE uid = $1
                                              `, [uid]);
            yield logoutDBClient.query(`INSERT INTO blacklist(uid, token) VALUES($1,$2)`, [uid, sessionToken]);
            return { msg: 'Logout Successful' };
        });
    }
}
exports.LogoutService = LogoutService;
//# sourceMappingURL=logoutService.js.map