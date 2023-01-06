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
exports.SeeTradesController = void 0;
const seeTradesService_1 = require("../../../services/consumer/trades/seeTradesService");
/**
 * Class responsible for receiving and calling the service methods that allows you to see the available exchanges
 */
class SeeTradesController {
    /**
     * Allows to get a meal that the authenticated user has already added to favorites, redirecting afterwards to the associated service
     *
     * {@link seeTradesService}
     *
     * @param response response.
     */
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const uId = response.locals.uid;
            try {
                if (uId === undefined) {
                    throw new Error("Invalid request");
                }
                const seeTradesService = new seeTradesService_1.SeeTradesService();
                const resp = yield seeTradesService.execute();
                response.status(resp.status).json(resp.data);
            }
            catch (e) {
                response.status(500).json(e.message);
            }
        });
    }
}
exports.SeeTradesController = SeeTradesController;
//# sourceMappingURL=seeTradesController.js.map