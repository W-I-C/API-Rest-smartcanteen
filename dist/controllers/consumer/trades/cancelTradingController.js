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
exports.CancelTradingController = void 0;
const cancelTradingService_1 = require("../../../services/consumer/trades/cancelTradingService");
/**
 * Class responsible for receiving and calling the service methods that allows you to cancel your ticket trade
 */
class CancelTradingController {
    /**
     * Allows to cancel ticke trading, redirecting afterwards to the associated service
     *
     * {@link directTicketTradeService}
     *
     * @param response response.
     */
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const uId = response.locals.uid;
            const ticketId = request.params.ticketId;
            try {
                if (uId === undefined || ticketId === undefined) {
                    throw new Error("Invalid request");
                }
                const cancelTradingService = new cancelTradingService_1.CancelTradingService();
                const resp = yield cancelTradingService.execute(uId, ticketId);
                response.status(resp.status).json(resp.data);
            }
            catch (e) {
                response.status(500).json(e.message);
            }
        });
    }
}
exports.CancelTradingController = CancelTradingController;
//# sourceMappingURL=cancelTradingController.js.map