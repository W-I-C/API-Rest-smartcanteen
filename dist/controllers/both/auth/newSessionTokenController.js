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
exports.NewSessionTokenController = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const newSessionTokenService_1 = require("../../../services/both/auth/newSessionTokenService");
/**
 * Class responsible for receiving and calling the service methods that allows to get a new session token
 */
class NewSessionTokenController {
    /**
   * Allows to get a new session token, redirecting afterwards to the associated service
   *
   * {@link newSessionTokenService}
   * @param request request receive.
   * @param response response.
   */
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const auth = request.headers.authorization;
            if (!auth || auth === undefined || auth === null) {
                response.status(401).send({ Error: "Unauthorized Request" });
            }
            else {
                const [, token] = auth.split(" ");
                const decodedToken = (0, jsonwebtoken_1.decode)(token);
                const uid = decodedToken['sub'].toString();
                const role = decodedToken['role'].toString();
                const newSessionTokenService = new newSessionTokenService_1.NewSessionTokenService();
                const resp = yield newSessionTokenService.execute(uid, role);
                response.status(resp['status']).send(resp['data']);
            }
        });
    }
}
exports.NewSessionTokenController = NewSessionTokenController;
//# sourceMappingURL=newSessionTokenController.js.map