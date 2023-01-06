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
exports.LoginService = void 0;
const db_1 = require("../../../config/db");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const bcrypt_1 = require("bcrypt");
class LoginService {
    execute(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // obter dados do user
            const loginDBClient = (0, db_1.createClient)();
            const query = yield loginDBClient.query(`SELECT uid,userrole.name, password FROM users 
                                              JOIN userrole On userrole.roleid = users.roleid
                                              WHERE email=$1 
                                              `, [email]);
            const querypassword = query["rows"][0]["password"];
            const comp = (0, bcrypt_1.compare)(password, querypassword);
            if (!comp) {
                throw new Error("authentication error");
            }
            // dados a carregar no token
            if (query['rowCount'] == 1) {
                const role = query['rows'][0]['name'];
                const uid = query['rows'][0]['uid'];
                const sessionToken = (0, jwtHelpers_1.createSessionToken)(uid, role);
                yield (0, jwtHelpers_1.createRefreshToken)(uid);
                return { status: 200, data: { token: sessionToken, role: role } };
            }
            else {
                return { status: 401, data: { msg: 'Wrong Credentials!' } };
            }
        });
    }
}
exports.LoginService = LoginService;
//# sourceMappingURL=loginService.js.map