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
exports.EditTicketStateService = void 0;
/**
 * @module editTicketStateService
 */
require('dotenv').config();
const db_1 = require("../../../config/db");
const dbHelpers_1 = require("../../../helpers/dbHelpers");
const removeTicketValidation_1 = require("../../../validations/consumer/ticket/removeTicketValidation");
const editMealValidation_1 = require("../../../validations/employee/meal/editMealValidation");
const editTicketStateValidation_1 = require("../../../validations/employee/ticket/editTicketStateValidation");
/**
 * Class responsible for the service that serves to edit the state of a ticket
 */
class EditTicketStateService {
    /**
     * Method that allows the employee to edit the state of a ticket
     *
     * @param uId authenticated user id
     * @param ticketId ticket to be edited the state
     * @param stateName qname of the state to associate to the ticket
     */
    execute(uId, ticketId, stateName) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticketIdExists = yield (0, removeTicketValidation_1.checkTicketExists)(ticketId);
            if (!ticketIdExists) {
                throw new Error('Ticket does not exists');
            }
            const stateNameExists = yield (0, editTicketStateValidation_1.checkStateNameExists)(stateName);
            if (!stateNameExists) {
                throw new Error('State does not exists');
            }
            // get the bar where the employee works
            const userBarId = yield (0, editMealValidation_1.getEmployeeBar)(uId);
            const ticketBarId = yield (0, editTicketStateValidation_1.getTicketBar)(ticketId);
            if (userBarId != ticketBarId) {
                throw new Error('Bars are not the same');
            }
            const stateNameTicket = yield (0, editTicketStateValidation_1.getStateId)(stateName);
            const ticketStateId = yield (0, editTicketStateValidation_1.getTicketState)(ticketId);
            const deliveredState = yield (0, dbHelpers_1.getDeliveredStatusId)();
            if (ticketStateId == deliveredState) {
                throw new Error('The ticket has already been delivered');
            }
            const editMealDBClient = (0, db_1.createClient)();
            yield editMealDBClient.query(`UPDATE tickets
                                    SET stateid = $1
                                    WHERE ticketid = $2`, [stateNameTicket, ticketId]);
            const query = yield editMealDBClient.query(`SELECT ticketid, stateid
                                                                FROM tickets
                                                                WHERE ticketid = $1`, [ticketId]);
            let editedMeal = query["rows"][0];
            return { editedMeal, status: 200 };
        });
    }
}
exports.EditTicketStateService = EditTicketStateService;
//# sourceMappingURL=editTicketStateService.js.map