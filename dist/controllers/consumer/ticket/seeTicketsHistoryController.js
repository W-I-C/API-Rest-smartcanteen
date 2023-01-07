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
exports.SeeTicketsHistoryController = void 0;
const seeTicketsHistoryService_1 = require("../../../services/consumer/ticket/seeTicketsHistoryService");
/**
 * Class responsible for receiving and calling the service methods that allow the user to see all the orders the authenticated user has already placed
 */
class SeeTicketsHistoryController {
    /**
     * Allows to get all orders that the authenticated user has placed, redirecting afterwards to the associated service
     *
     * {@link seeTicketsHistoryService}
     * @param request request receive.
     * @param response response.
     */
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const uId = response.locals.uid;
            try {
                if (uId === undefined) {
                    throw new Error("Invalid request");
                }
                const seeTicketsHistoryService = new seeTicketsHistoryService_1.SeeTicketsHistoryService();
                const resp = yield seeTicketsHistoryService.execute(uId);
                response.status(resp.status).json(resp.data);
            }
            catch (e) {
                response.status(500).json(e.message);
            }
        });
    }
}
exports.SeeTicketsHistoryController = SeeTicketsHistoryController;
//# sourceMappingURL=seeTicketsHistoryController.js.map