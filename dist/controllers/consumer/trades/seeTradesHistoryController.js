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
exports.SeeTradesHistoryController = void 0;
const seeTradesHistoryService_1 = require("../../../services/consumer/trades/seeTradesHistoryService");
/**
 * Class responsible for receiving and calling the service methods that allows you to see the history of consumer exchanges
 */
class SeeTradesHistoryController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Allows to get a meal that the authenticated user has already added to favorites, redirecting afterwards to the associated service
             *
             * {@link seeTradesHistoryService}
             *
             * @param response response.
             */
            const uId = response.locals.uid;
            try {
                if (uId === undefined) {
                    throw new Error("Invalid request");
                }
                const seeTradesHistoryService = new seeTradesHistoryService_1.SeeTradesHistoryService();
                const resp = yield seeTradesHistoryService.execute(uId);
                response.status(resp.status).json(resp.data);
            }
            catch (e) {
                response.status(500).json(e.message);
            }
        });
    }
}
exports.SeeTradesHistoryController = SeeTradesHistoryController;
//# sourceMappingURL=seeTradesHistoryController.js.map