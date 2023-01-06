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
exports.checkMealExistsBar = exports.getEmployeeBar = exports.getMealBar = exports.checkMealExists = void 0;
/**
 * @module editMealValidation
 */
const db_1 = require("../../../config/db");
/**
 * For the bar employee to edit a meal that already exists on the menu, we first need to check if it already exists
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
/**
 * A meal is on the bar menu. For the employee to be able to edit this meal,
 * it is necessary to check if the bar of the meal is the same as the employee's bar.
 * This function allows to get the bar of the meal
 *
 * @param mealId id of the meal to be edited
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
 * @param uId id of the employee that wants to edit the meal
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
/**
 * A bar has a menu with various meals. Each meal can only appear once on that menu.
 * The user when editing the meal cannot choose a name of a meal that already exists in that bar.
 * So this function allows to check if that bar already has that meal name.
 *
 * @param name name that the authenticated employee intends to give to the meal
 * @param barId id of the bar to which the meal belongs
 */
function checkMealExistsBar(name, barId) {
    return __awaiter(this, void 0, void 0, function* () {
        const MealExists = (0, db_1.createClient)();
        const query = yield MealExists.query(`SELECT * FROM meals 
                                        WHERE name=$1 AND barId=$2 AND isdeleted = $3`, [name, barId, false]);
        return query['rows'].length != 0;
    });
}
exports.checkMealExistsBar = checkMealExistsBar;
//# sourceMappingURL=editMealValidation.js.map