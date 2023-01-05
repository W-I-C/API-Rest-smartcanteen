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
exports.validateRefreshToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const dbHelpers_1 = require("../helpers/dbHelpers");
/**
 * Validate refresh token middleware
 *
 * @param request request received
 * @param response response objecet
 * @param next next function to execute
 */
function validateRefreshToken(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // header > Bearer token > split(" ") > ["Bearer", "token"] > "token"
        const uid = response.locals.uid;
        const token = yield (0, dbHelpers_1.getRefreshToken)(uid);
        try {
            // verify if token is from us and if is expired
            const verified = (0, jsonwebtoken_1.verify)(token, process.env.JWT_REFRESH_TOKEN_KEY);
            if (!verified) {
                response.status(401).send({ Error: "Unauthorized Request" });
            }
            else {
                next();
            }
        }
        catch (e) {
            response.status(401).send({ Error: "Unauthorized Request" });
        }
    });
}
exports.validateRefreshToken = validateRefreshToken;
//# sourceMappingURL=validateRefreshToken.js.map