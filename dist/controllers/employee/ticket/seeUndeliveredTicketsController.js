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
exports.SeeUndeliveredTicketsController = void 0;
const seeUndeliveredTicketsService_1 = require("../../../services/employee/ticket/seeUndeliveredTicketsService");
/**
 * Class responsible for receiving and calling the service methods that allow the employee to see all the orders that consumers have placed at the bar where he works
 */
class SeeUndeliveredTicketsController {
    /**
     * Allows to obtain all orders placed by consumers, redirecting afterwards to the associated service
     *
     * {@link seeUndeliveredTicketsService}
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
                const seeUndeliveredTicketsService = new seeUndeliveredTicketsService_1.SeeUndeliveredTicketsService();
                const resp = yield seeUndeliveredTicketsService.execute(uId);
                response.status(resp.status).json(resp.data);
            }
            catch (e) {
                response.status(500).json(e.message);
            }
        });
    }
}
exports.SeeUndeliveredTicketsController = SeeUndeliveredTicketsController;
//# sourceMappingURL=seeUndeliveredTicketsController.js.map