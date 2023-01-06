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
exports.checkStateNameExists = exports.getStateId = exports.getTicketState = exports.getTicketBar = void 0;
/**
 * @module editTicketStateValidation
 */
const db_1 = require("../../../config/db");
/**
 * An employee has access to a list of orders placed by different students that have not yet been delivered.
 * These tickets have an associated status that can be edited by the employee. For this to be done the bar must be the same as the order bar
 *
 * @param uId id of the authenticated employee who wants to edit the state of a ticket
 */
function getTicketBar(ticketId) {
    return __awaiter(this, void 0, void 0, function* () {
        const checkTicketBarDBClient = (0, db_1.createClient)();
        const query = yield checkTicketBarDBClient.query(`SELECT barid FROM tickets
                                                        WHERE ticketid = $1`, [ticketId]);
        return query['rows'][0]["barid"];
    });
}
exports.getTicketBar = getTicketBar;
/**
 * An employee has access to a list of orders placed by different students that have not yet been delivered.
 * These tickets have an associated status that can be edited by the employee. For this to be done the bar must be the same as the order bar
 *
 * @param ticketId id of the ticket that we want to know the state
 */
function getTicketState(ticketId) {
    return __awaiter(this, void 0, void 0, function* () {
        const getTicketStateDBClient = (0, db_1.createClient)();
        const query = yield getTicketStateDBClient.query(`SELECT stateid FROM tickets
                                                        WHERE ticketid = $1`, [ticketId]);
        return query['rows'][0]["stateid"];
    });
}
exports.getTicketState = getTicketState;
/**
 * To change the state of a ticket you need to get the state id
 *
 * @param stateName name of the state that will be associated to the ticket
 */
function getStateId(stateName) {
    return __awaiter(this, void 0, void 0, function* () {
        const getStateIdDBClient = (0, db_1.createClient)();
        const query = yield getStateIdDBClient.query(`SELECT stateid FROM states
                                                WHERE name = $1`, [stateName]);
        return query['rows'][0]["stateid"];
    });
}
exports.getStateId = getStateId;
/**
 * To change the state of a ticket you need to check if the state exists
 *
 * @param stateName name of the state that will be associated to the ticket
 */
function checkStateNameExists(stateName) {
    return __awaiter(this, void 0, void 0, function* () {
        const checkStateNameDBClient = (0, db_1.createClient)();
        const query = yield checkStateNameDBClient.query(`SELECT stateid FROM states
                                                WHERE name = $1`, [stateName]);
        return query['rows'].length != 0;
    });
}
exports.checkStateNameExists = checkStateNameExists;
//# sourceMappingURL=editTicketStateValidation.js.map