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
exports.SeeDetailsMealTicketController = void 0;
const seeDetailsMealTicketService_1 = require("../../../services/both/tickets/seeDetailsMealTicketService");
/**
 * Class responsible for receiving and calling the service methods that allow the employee to get details from order
 */
class SeeDetailsMealTicketController {
    /**
   * Allows to get a meals detail from order
   *
   * {@link createmealService}
   * @param request request receive.
   * @param response response.
   */
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticketId = request.params.ticketId;
            const uId = response.locals.uid;
            try {
                if (ticketId === undefined) {
                    throw new Error("Some parameter is incorrect");
                }
                const seeDetailsMealTicketService = new seeDetailsMealTicketService_1.SeeDetailsMealTicketService();
                const resp = yield seeDetailsMealTicketService.execute(ticketId);
                response.status(resp.status).json(resp.data);
            }
            catch (e) {
                response.status(500).json(e.message);
            }
        });
    }
}
exports.SeeDetailsMealTicketController = SeeDetailsMealTicketController;
//# sourceMappingURL=seeDetailsMealTicketController.js.map