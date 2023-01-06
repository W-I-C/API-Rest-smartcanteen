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
exports.LoginController = void 0;
const loginService_1 = require("../../../services/both/auth/loginService");
/**
 * Class responsible for receiving and calling the service methods that allows to login
 */
class LoginController {
    /**
     * Allows to login, redirecting afterwards to the associated service
     *
     * {@link loginService}
     * @param request request receive.
     * @param response response.
     */
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let { email, password } = request.body;
            const loginService = new loginService_1.LoginService();
            const resp = yield loginService.execute(email, password);
            response.status(resp.status).json(resp.data);
        });
    }
}
exports.LoginController = LoginController;
//# sourceMappingURL=loginController.js.map