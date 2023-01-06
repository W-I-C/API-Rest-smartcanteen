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
exports.AddMealCartService = void 0;
/**
 * @module addMealCartService
 */
require('dotenv').config();
const db_1 = require("../../../config/db");
const editMealValidation_1 = require("../../../validations/employee/meal/editMealValidation");
/**
 * Class responsible for the service that serves to add meal to consumer cart
 */
class AddMealCartService {
    /**
    * Method that allows you to get the details of a meal that the authenticated user has added to favorites
    * @param uId authenticated user id
    * @param mealId meal to be added to cart
    * @param amount quantity of meal to be added to cart
    */
    execute(mealId, uId, amount, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const favMeal = (0, db_1.createClient)();
            let date = new Date();
            //TODO : por a rota a funcionar
            const query = yield favMeal.query('SELECT cartId from cart WHERE uId=$1 AND isCompleted=$2', [uId, false]);
            const cartUser = query["rows"][0]["cartId"];
            const mealExists = yield (0, editMealValidation_1.checkMealExists)(mealId);
            const mealsCart = yield (0, editMealValidation_1.checkCartMealsExists)(cartUser);
            if (!mealExists) {
                throw new Error("Meal dont exist");
            }
            if (query.rowCount <= 0) {
                const queryCreateCart = yield favMeal.query('INSERT INTO cart (uId,date,isCompleted) VALUES ($1,$2,$3)', [uId, date, false]);
                const cartQuery = yield favMeal.query('SELECT cartId from cart WHERE uId=$1 AND isCompleted=$2', [uId, false]);
                const newcartId = cartQuery["rows"][0]["cartid"];
                const queryPrice = yield favMeal.query('SELECT price from Meals WHERE mealId=$1', [mealId]);
                const queryChange = yield favMeal.query('SELECT * from allowedChanges WHERE mealid=$1', [mealId]);
                const value = queryChange["rows"];
                if (value.length >= 0) {
                    const mealPrice = queryPrice["rows"][0]["price"];
                    const query = yield favMeal.query('INSERT INTO cartmeals (mealId,cartId,amount,mealPrice) VALUES ($1,$2,$3,$4)', [mealId, newcartId, amount, mealPrice]);
                    const selectinfomeals = yield favMeal.query('SELECT * FROM cartmeals WHERE  (mealId,cartId,amount,mealPrice)', []);
                    const data = query["rows"];
                    return { data, status: 200 };
                }
                else {
                    const mealPrice = queryPrice["rows"][0]["price"];
                    const query = yield favMeal.query('INSERT INTO CartMeals (mealId,cartId,amount,mealPrice) VALUES ($1,$2,$3,$4)', [mealId, newcartId, amount, mealPrice]);
                    const data = query["rows"];
                    return { data, status: 200 };
                }
            }
            else {
                const cartId = cartUser["rows"][0]["cartid"];
                const queryPrice = yield favMeal.query('SELECT price from Meals WHERE mealId=$1', [mealId]);
                const mealPrice = queryPrice["rows"][0]["price"];
                if (!mealsCart) {
                    const query = yield favMeal.query('INSERT INTO CartMeals (mealId,cartId,amount,mealPrice) VALUES ($1,$2,$3,$4)', [mealId, cartId, amount, mealPrice]);
                    const queryCart = yield favMeal.query('SELECT mealid,amount,mealprice from cartmeals WHERE cartid=$1', [cartId]);
                    const data = queryCart["rows"];
                    return { data, status: 200 };
                }
                else {
                    const queryBar = yield favMeal.query('SELECT * FROM cartmeals WHERE cartid=$1', [cartUser]);
                    const selectMealUser = queryBar["rows"][0]["mealId"];
                    const barMeal = (0, editMealValidation_1.getMealBar)(selectMealUser);
                    const newBarMeal = (0, editMealValidation_1.getMealBar)(mealId);
                    if (barMeal != newBarMeal) {
                        throw new Error("Bars are not the same");
                    }
                    else {
                        const query = yield favMeal.query('INSERT INTO CartMeals (mealId,cartId,amount,mealPrice) VALUES ($1,$2,$3,$4)', [mealId, cartId, amount, mealPrice]);
                        const queryCart = yield favMeal.query('SELECT mealid,amount,mealprice from cartmeals WHERE cartid=$1', [cartId]);
                        const data = queryCart["rows"];
                        return { data, status: 200 };
                    }
                }
            }
        });
    }
}
exports.AddMealCartService = AddMealCartService;
//# sourceMappingURL=addMealCartService.js.map