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
exports.LogoutController = void 0;
const logoutService_1 = require("../../../services/both/auth/logoutService");
/**
 * Class responsible for receiving and calling the service methods that allows to logout
 */
class LogoutController {
    /**
   * Allows to logout, redirecting afterwards to the associated service
   *
   * {@link logoutService}
   * @param request request receive.
   * @param response response.
   */
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const uid = response.locals.uid;
            const token = request.headers.authorization.split(" ")[1];
            const logoutService = new logoutService_1.LogoutService();
            const resp = yield logoutService.execute(uid, token);
            response.status(200).json(resp.msg);
        });
    }
}
exports.LogoutController = LogoutController;
//# sourceMappingURL=logoutController.js.map