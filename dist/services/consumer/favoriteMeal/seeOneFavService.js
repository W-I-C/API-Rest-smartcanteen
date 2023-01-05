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
exports.SeeOneFavService = void 0;
/**
 * @module seeOneFavService
 */
require('dotenv').config();
const db_1 = require("../../../config/db");
const seeOneFavValidation_1 = require("../../../validations/consumer/favoriteMeal/seeOneFavValidation");
/**
 * Class responsible for the service that serves to get the details of a meal that the authenticated user has already added to favorites
 */
class SeeOneFavService {
    /**
     * Method that allows you to get the details of a meal that the authenticated user has added to favorites
     * @param uId authenticated user id
     * @param favMealId id of the meal that the authenticated user has added to favorites and wants to see the details of
     */
    execute(uId, favMealId) {
        return __awaiter(this, void 0, void 0, function* () {
            const seeOneFavDBClient = (0, db_1.createClient)();
            const mealIdExists = yield (0, seeOneFavValidation_1.checkFavMealExists)(favMealId);
            if (!mealIdExists) {
                throw new Error('FavMeal does not exists');
            }
            const userMealId = yield (0, seeOneFavValidation_1.getUserFavMeal)(favMealId);
            if (userMealId != uId) {
                throw new Error('Favmeal does not belong to you');
            }
            const query = yield seeOneFavDBClient.query(`SELECT meals.name, meals.preparationtime, meals.price, mealimages.url 
                                            FROM favoritemeals 
                                            JOIN meals ON favoritemeals.mealid = meals.mealid 
                                            LEFT JOIN mealimages ON meals.mealid = mealimages.mealid 
                                            WHERE favoritemeals.favoritemealid = $1 AND favoritemeals.uid = $2`, [favMealId, uId]);
            const data = query["rows"][0];
            return { data, status: 200 };
        });
    }
}
exports.SeeOneFavService = SeeOneFavService;
//# sourceMappingURL=seeOneFavService.js.map