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
exports.RemoveFavService = void 0;
/**
 * @module removeFavService
 */
require('dotenv').config();
const db_1 = require("../../../config/db");
const removeFavValidation_1 = require("../../../validations/consumer/favoriteMeal/removeFavValidation");
/**
 * Class responsible for the service that serves to remove one of the meals from the favorites of the authenticated user
 */
class RemoveFavService {
    /**
     * Method that allows the authenticated user to remove a meal from favorites
     *
     * @param uId authenticated user id
     * @param favMealId id of the meal to be removed from favorites
     */
    execute(uId, favMealId) {
        return __awaiter(this, void 0, void 0, function* () {
            const mealIdExists = yield (0, removeFavValidation_1.checkFavMealExists)(favMealId);
            if (!mealIdExists) {
                throw new Error('FavMeal does not exists');
            }
            const userMealId = yield (0, removeFavValidation_1.getUserFavMeal)(favMealId);
            if (userMealId != uId) {
                throw new Error('Favmeal does not belong to you');
            }
            const removeFavDBClient = (0, db_1.createClient)();
            const query = yield removeFavDBClient.query(`DELETE FROM favoritemeals 
                                            WHERE uid = $1 AND favoritemealid = $2`, [uId, favMealId]);
            const data = query["rows"];
            return { data, status: 200 };
        });
    }
}
exports.RemoveFavService = RemoveFavService;
//# sourceMappingURL=removeFavService.js.map