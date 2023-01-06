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
exports.RemoveMealsCartService = void 0;
/**
 * @module removeMealsCartService
 */
require('dotenv').config();
const db_1 = require("../../../config/db");
/**
 * class responsible for removing a meal from the cart
 */
class RemoveMealsCartService {
    /**
       * Method that allows you to get the details of a meal that the authenticated user has added to favorites
       * @param uId authenticated user id
       * @param cartMealId id of the meal associated with the cart
       */
    execute(cartMealId, uId) {
        return __awaiter(this, void 0, void 0, function* () {
            const removeMeal = (0, db_1.createClient)();
            const verifyUser = yield removeMeal.query('SELECT cartId from cart WHERE uId=$1', [uId]);
            if (verifyUser.rowCount > 0) {
                const query = yield removeMeal.query('DELETE FROM cartMeals WHERE cartMealId=$1', [cartMealId]);
                const querySelect = yield removeMeal.query('SELECT * from cart WHERE uId=$1', [uId]);
                const data = querySelect["rows"];
                return { data, status: 200 };
            }
            else {
                throw new Error('o user não pertence a este carrinho');
            }
        });
    }
}
exports.RemoveMealsCartService = RemoveMealsCartService;
//# sourceMappingURL=removeMealCartService.js.map