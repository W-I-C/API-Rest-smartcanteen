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
exports.getEmployeeBar = exports.getMealBar = exports.checkMealCartExists = exports.checkMealExists = void 0;
const db_1 = require("../../../config/db");
/**
 * For the bar employee to remove a meal that already exists on the menu, we first need to check if it already exists
 *
 * @param mealId id of the meal to be removed
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
/**
 * For the employee to be able to delete a meal, he must first check if any user has already added that meal to the cart
 *
 * @param mealId id of the meal to be removed
 */
function checkMealCartExists(mealId) {
    return __awaiter(this, void 0, void 0, function* () {
        const checkMealExistsDBClient = (0, db_1.createClient)();
        const query = yield checkMealExistsDBClient.query(`SELECT mealid FROM cartmeals
                                                        WHERE mealid = $1`, [mealId]);
        return query['rows'].length != 0;
    });
}
exports.checkMealCartExists = checkMealCartExists;
/**
 * A meal is on the bar menu. For the employee to be able to remove this meal,
 * it is necessary to check if the bar of the meal is the same as the employee's bar.
 * This function allows to get the bar of the meal
 *
 * @param mealId id of the meal to be removed
 */
function getMealBar(mealId) {
    return __awaiter(this, void 0, void 0, function* () {
        const getMealBarDBClient = (0, db_1.createClient)();
        const query = yield getMealBarDBClient.query(`SELECT barid FROM meals
                                                    WHERE mealid = $1`, [mealId]);
        return query['rows'][0]["barid"];
    });
}
exports.getMealBar = getMealBar;
/**
 * To be able to compare the meal bar with the employee bar (like the function above),
 * This function allows to get the employee bar
 *
 * @param uId id of the employee that wants to remove the meal
 */
function getEmployeeBar(uId) {
    return __awaiter(this, void 0, void 0, function* () {
        const checkMealExistsDBClient = (0, db_1.createClient)();
        const query = yield checkMealExistsDBClient.query(`SELECT preferredbar FROM users
                                                        WHERE uid = $1`, [uId]);
        return query['rows'][0]["preferredbar"];
    });
}
exports.getEmployeeBar = getEmployeeBar;
//# sourceMappingURL=removeMealValidation.js.map