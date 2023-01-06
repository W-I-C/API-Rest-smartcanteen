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
exports.RemoveTicketController = void 0;
const removeTicketService_1 = require("../../../services/consumer/ticket/removeTicketService");
/**
 * Class responsible for receiving and calling the service methods that allow the user to remove a order
 */
class RemoveTicketController {
    /**
   * Allows you to remove a order, redirecting afterwards to the associated service
   *
   * {@link removeTicketService}
   * @param request request receive.
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
                const removeTicketService = new removeTicketService_1.RemoveTicketService();
                const resp = yield removeTicketService.execute(uId, ticketId);
                response.status(resp.status).json(resp.data);
            }
            catch (e) {
                response.status(500).json(e.message);
            }
        });
    }
}
exports.RemoveTicketController = RemoveTicketController;
//# sourceMappingURL=removeTicketController.js.map