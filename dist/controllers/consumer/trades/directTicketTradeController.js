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
exports.DirectTicketTradeController = void 0;
const directTicketTradeService_1 = require("../../../services/consumer/trades/directTicketTradeService");
/**
 * Class responsible for receiving and calling the service methods that allows you to make a direct trade with a user
 */
class DirectTicketTradeController {
    /**
     * Allows to make a direct trade proposal to a user, redirecting afterwards to the associated service
     *
     * {@link directTicketTradeService}
     *
     * @param response response.
     */
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const uId = response.locals.uid;
            const ticketId = request.params.ticketId;
            const receiverid = request.params.receiverId;
            try {
                if (uId === undefined || ticketId === undefined || receiverid === undefined) {
                    throw new Error("Invalid request");
                }
                const directTicketTradeService = new directTicketTradeService_1.DirectTicketTradeService();
                const resp = yield directTicketTradeService.execute(uId, receiverid, ticketId);
                response.status(resp.status).json(resp.data);
            }
            catch (e) {
                response.status(500).json(e.message);
            }
        });
    }
}
exports.DirectTicketTradeController = DirectTicketTradeController;
//# sourceMappingURL=directTicketTradeController.js.map