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
exports.AddFavService = void 0;
/**
 * @module addFavService
 */
require('dotenv').config();
const db_1 = require("../../../config/db");
const addFavValidation_1 = require("../../../validations/consumer/favoriteMeal/addFavValidation");
const editMealValidation_1 = require("../../../validations/employee/meal/editMealValidation");
/**
 * Class responsible for the service that serves to add a meal to favoritemeal
 */
class AddFavService {
    /**
       * Method that allows you to add a meal to favorite meal
       */
    execute({ mealId, uId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const favMeal = (0, db_1.createClient)();
            const mealIdExists = yield (0, addFavValidation_1.checkMealExists)(mealId);
            if (!mealIdExists) {
                throw new Error('Meal does not exists');
            }
            const userBar = yield (0, editMealValidation_1.getEmployeeBar)(uId);
            const mealBar = yield (0, editMealValidation_1.getMealBar)(mealId);
            if (userBar != mealBar) {
                throw new Error('Bars are not the same');
            }
            const query = yield favMeal.query('INSERT INTO FavoriteMeals (uId, mealId) VALUES ($1,$2)', [uId, mealId]);
            const queryFav = yield favMeal.query('SELECT * from FavoriteMeals WHERE uid = $1', [uId]);
            const data = queryFav["rows"];
            return { data, status: 200 };
        });
    }
}
exports.AddFavService = AddFavService;
//# sourceMappingURL=addFavService.js.map