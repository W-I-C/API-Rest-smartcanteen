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
exports.validateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
/**
 * Validate session token middleware
 *
 * @param request request received
 * @param response response objecet
 * @param next next function to execute
 */
function validateToken(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const auth = request.headers.authorization;
        if (!auth || auth === undefined || auth === null) {
            response.status(401).send({ Error: "Unauthorized Request" });
        }
        else {
            // header > Bearer token > split(" ") > ["Bearer", "token"] > "token"
            const [, token] = auth.split(" ");
            try {
                // verify if token is from us and if is expired
                const verified = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET_KEY);
                if (!verified)
                    response.status(401).send({ Error: "Unauthorized Request" });
                else {
                    const decodedToken = (0, jsonwebtoken_1.decode)(token);
                    response.locals.uid = decodedToken['sub'].toString();
                    response.locals.role = decodedToken['role'].toString();
                    next();
                }
            }
            catch (e) {
                response.status(401).send({ Error: "Unauthorized Request" });
            }
        }
    });
}
exports.validateToken = validateToken;
//# sourceMappingURL=validateToken.js.map