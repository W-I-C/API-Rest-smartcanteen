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
exports.AcceptTradeController = void 0;
const acceptTradeService_1 = require("../../../services/consumer/trades/acceptTradeService");
/**
 * Class responsible for receiving and calling the methods of the service that allows the user to accept the trade
 */
class AcceptTradeController {
    /**
     * Allows to edit the data regarding the acceptance of the trade, redirecting afterwards to the associated service
     *
     * {@link acceptTradeService}
     * @param request request receive.
     * @param response response.
     */
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const uId = response.locals.uid;
            const ticketId = request.params.ticketId;
            let { receptorDecision } = request.body;
            try {
                if (uId === undefined || ticketId === undefined || receptorDecision === undefined) {
                    throw new Error("Invalid request");
                }
                const acceptTradeService = new acceptTradeService_1.AcceptTradeService();
                const resp = yield acceptTradeService.execute({ uId, ticketId, receptorDecision });
                response.status(resp.status).json(resp.data);
            }
            catch (e) {
                response.status(500).json(e.message);
            }
        });
    }
}
exports.AcceptTradeController = AcceptTradeController;
//# sourceMappingURL=acceptTradeController.js.map