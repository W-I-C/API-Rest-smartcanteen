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
exports.getUserFavMeal = exports.checkFavMealExists = void 0;
/**
 * @module removeFavValidation
 */
const db_1 = require("../../../config/db");
/**
 * For the consumer to remove a meal from the favorites, first we need to check if the favorite meal exists
 *
 * @param favMealId id of the favorite meal to be removed
 */
function checkFavMealExists(favMealId) {
    return __awaiter(this, void 0, void 0, function* () {
        const checkMealExistsDBClient = (0, db_1.createClient)();
        const query = yield checkMealExistsDBClient.query(`SELECT * FROM favoritemeals
                                                        WHERE favoritemealid = $1`, [favMealId]);
        return query['rows'].length != 0;
    });
}
exports.checkFavMealExists = checkFavMealExists;
/**
 * If the user can see the details of a favorite meal, he can only see the favorite meals that belong to him
 *
 * @param favMealId id of the favorite meal the user wants to see more details about
 */
function getUserFavMeal(favMealId) {
    return __awaiter(this, void 0, void 0, function* () {
        const checkMealExistsDBClient = (0, db_1.createClient)();
        const query = yield checkMealExistsDBClient.query(`SELECT uid FROM favoritemeals
                                                        WHERE favoritemealid = $1`, [favMealId]);
        return query['rows'][0]["uid"];
    });
}
exports.getUserFavMeal = getUserFavMeal;
//# sourceMappingURL=removeFavValidation.js.map