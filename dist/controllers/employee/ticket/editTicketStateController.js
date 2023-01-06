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
exports.EditTicketStateController = void 0;
const editTicketStateService_1 = require("../../../services/employee/ticket/editTicketStateService");
/**
 * Class responsible for receiving and calling the methods of the service that allows the employee to edit the state of a ticket
 */
class EditTicketStateController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Allows to edit a the state of a ticket, redirecting afterwards to the associated service
             *
             * {@link editTicketStateService}
             * @param request request receive.
             * @param response response.
             */
            const uId = response.locals.uid;
            const ticketId = request.params.ticketId;
            let { stateName } = request.body;
            try {
                if (uId === undefined ||
                    ticketId === undefined ||
                    stateName === undefined) {
                    throw new Error("Invalid request");
                }
                const editTicketStateService = new editTicketStateService_1.EditTicketStateService();
                const resp = yield editTicketStateService.execute(uId, ticketId, stateName);
                response.status(resp.status).json(resp.editedMeal);
            }
            catch (e) {
                response.status(500).json(e.message);
            }
        });
    }
}
exports.EditTicketStateController = EditTicketStateController;
//# sourceMappingURL=editTicketStateController.js.map