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
exports.NewSessionTokenService = void 0;
/**
 * @module newSessionTokenService
 */
const dbHelpers_1 = require("../../../helpers/dbHelpers");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const jsonwebtoken_1 = require("jsonwebtoken");
/**
 * class responsible for getting new session token
 */
class NewSessionTokenService {
    /**
     * Method that allows you to get a new session token
     * @param uid role id
     * @param role preferred campus
     */
    execute(uid, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshToken = yield (0, dbHelpers_1.getRefreshToken)(uid);
            const decodedRefreshToken = (0, jsonwebtoken_1.decode)(refreshToken);
            const refExpTime = decodedRefreshToken['exp'];
            if (Date.now() >= (refExpTime * 1000)) {
                return { status: 401, data: { Error: "Unauthorized Request" } };
            }
            else {
                try {
                    const verified = (0, jsonwebtoken_1.verify)(refreshToken, process.env.JWT_REFRESH_TOKEN_KEY);
                    if (verified) {
                        const newSessionToken = (0, jwtHelpers_1.createSessionToken)(uid, role);
                        return { status: 200, data: { token: newSessionToken, role: role } };
                    }
                    else {
                        return { status: 401, data: { Error: "Unauthorized Request" } };
                    }
                }
                catch (e) {
                    return { status: 401, data: { Error: "Unauthorized Request" } };
                }
            }
        });
    }
}
exports.NewSessionTokenService = NewSessionTokenService;
//# sourceMappingURL=newSessionTokenService.js.map