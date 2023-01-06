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
exports.getRefreshToken = void 0;
const db_1 = require("../config/db");
function getRefreshToken(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        // verificar se o token de refresh expirou
        const getRefreshTokenDBClient = (0, db_1.createClient)();
        const query = yield getRefreshTokenDBClient.query(`SELECT "refreshtoken" FROM users 
                                              WHERE uid = $1
                                              `, [uid]);
        return query['rows'][0]['refreshtoken'];
    });
}
exports.getRefreshToken = getRefreshToken;
//# sourceMappingURL=dbHelpers.js.map