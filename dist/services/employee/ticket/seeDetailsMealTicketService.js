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
exports.SeeDetailsMealTicketService = void 0;
/**
 * @module seeDetailMealService
 */
require('dotenv').config();
const db_1 = require("../../../config/db");
/**
* Class responsible for the service that serves to create meals in barget details from order
**/
class SeeDetailsMealTicketService {
    /**
      * Method that allows you to get the details of a meal that the employee from order
      * @param ticketId id ticket to search
      */
    execute(ticketId) {
        return __awaiter(this, void 0, void 0, function* () {
            const seeMeals = (0, db_1.createClient)();
            try {
                const selectCartResult = yield seeMeals.query('SELECT cartid from tickets WHERE ticketid=$1', [ticketId]);
                const cart = selectCartResult["rows"][0]["cartid"];
                const selectMealResult = yield seeMeals.query('SELECT mealid from cartmeals WHERE cartid=$1', [cart]);
                const mealIds = selectMealResult["rows"];
                const mealData = [];
                for (let i = 0; i < mealIds.length; i++) {
                    const meal = mealIds[i]["mealid"];
                    const detail = yield seeMeals.query('SELECT name,description,canTakeAway from meals WHERE mealId=$1', [meal]);
                    const data = detail["rows"][0];
                    mealData.push(data);
                }
                return { data: mealData, status: 200 };
            }
            catch (error) {
                return { error: error.message, status: 500 };
            }
        });
    }
}
exports.SeeDetailsMealTicketService = SeeDetailsMealTicketService;
//# sourceMappingURL=seeDetailsMealTicketService.js.map