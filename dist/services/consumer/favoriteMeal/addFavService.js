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
            // TODO: ver se o bar da meal e o bar do user é igual
            const query = yield favMeal.query('INSERT INTO FavoriteMeals (uId, mealId) VALUES ($1,$2)', [uId, mealId]);
            // TODO: verificação para ver se o isDeleted é false - acrescentar aos testes de código
            const queryFav = yield favMeal.query('SELECT * from FavoriteMeals');
            const data = queryFav["rows"];
            return { data, status: 200 };
        });
    }
}
exports.AddFavService = AddFavService;
//# sourceMappingURL=addFavService.js.map