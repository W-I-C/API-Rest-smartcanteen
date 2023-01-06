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
exports.checkMealExists = void 0;
/**
 * @module addFavValidation
 */
const db_1 = require("../../../config/db");
/**
 * For the user to insert a meal in the favorites, first we need to check if the meal exists
 *
 * @param mealId id of the meal to be edited
 */
function checkMealExists(mealId) {
    return __awaiter(this, void 0, void 0, function* () {
        const checkMealExistsDBClient = (0, db_1.createClient)();
        const query = yield checkMealExistsDBClient.query(`SELECT mealid FROM meals
                                                        WHERE mealid = $1 AND isdeleted = $2`, [mealId, false]);
        return query['rows'].length != 0;
    });
}
exports.checkMealExists = checkMealExists;
//# sourceMappingURL=addFavValidation.js.map