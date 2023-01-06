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
exports.createRefreshToken = exports.createSessionToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const db_1 = require("../config/db");
function createSessionToken(uid, role) {
    // get jwt secret key
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    // dados a carregar no token
    const data = { role: role, time: Date() };
    const token = (0, jsonwebtoken_1.sign)(data, jwtSecretKey, { subject: uid, expiresIn: '15m' });
    return token;
}
exports.createSessionToken = createSessionToken;
function createRefreshToken(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        // get jwt secret key
        let jwtRefreshKey = process.env.JWT_REFRESH_TOKEN_KEY;
        const token = (0, jsonwebtoken_1.sign)({}, jwtRefreshKey, { subject: uid, expiresIn: '1y' });
        const refreshTokenDBClient = (0, db_1.createClient)();
        const insertRefreshTokenQuery = yield refreshTokenDBClient.query(`UPDATE users SET "refreshtoken" = $1 WHERE uid = $2`, [token, uid]);
    });
}
exports.createRefreshToken = createRefreshToken;
//# sourceMappingURL=jwtHelpers.js.map