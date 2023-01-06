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
exports.getCampusBar = exports.EditProfileValidator = void 0;
/**
 * @module editProfileValidation
 */
const db_1 = require("../../../config/db");
/**
 * Allows to check if both the bar and the campus the user chose when editing the profile exist
 *
 * @param campusId id of the campus the user wants to associate with his account
 * @param barId id of the bar the user wants to associate with his account
 */
class EditProfileValidator {
    validate(campusId, barId) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkCampusExistsDBClient = (0, db_1.createClient)();
            const queryCampusExists = yield checkCampusExistsDBClient.query(`SELECT campusid FROM campus
                                                            WHERE campusid = $1`, [campusId]);
            const checkBarExistsDBClient = (0, db_1.createClient)();
            const queryBarExists = yield checkBarExistsDBClient.query(`SELECT barid FROM bar
                                                            WHERE barid = $1`, [barId]);
            // retorna true ou false
            return queryCampusExists['rows'].length != 0 && queryBarExists['rows'].length != 0;
        });
    }
}
exports.EditProfileValidator = EditProfileValidator;
/**
 * Allows to get the campus that the bar is associated to, to know if when editing the profile the user
 * chooses a bar that belongs to the campus that he selected
 *
 * @param barId id of the bar to which we want to know the campus
 */
function getCampusBar(barId) {
    return __awaiter(this, void 0, void 0, function* () {
        const getCampusBarDBClient = (0, db_1.createClient)();
        const query = yield getCampusBarDBClient.query(`SELECT campusid
                                                    FROM bar
                                                    WHERE barid = $1`, [barId]);
        return query['rows'][0]['campusid'];
    });
}
exports.getCampusBar = getCampusBar;
//# sourceMappingURL=editProfileValidation.js.map