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
exports.SeeMealsDetailService = void 0;
/**
 * @module seeMealsDetailService
 */
require('dotenv').config();
const db_1 = require("../../../config/db");
/**
 * Class responsible for the service that serves to get the details of a meal that the authenticated user has choose
 */
class SeeMealsDetailService {
    /**
        * Method that allows you to get the details of a meal that the authenticated user has choose
        * @param uId authenticated user id
       
        */
    execute(uId, mealId) {
        return __awaiter(this, void 0, void 0, function* () {
            const mealsDetailDBClient = (0, db_1.createClient)();
            const query = yield mealsDetailDBClient.query('SELECT name,preparationTime,description,canTakeAway,price from Meals WHERE mealid=$1', [mealId]);
            const data = query["rows"];
            return { data, status: 200 };
        });
    }
}
exports.SeeMealsDetailService = SeeMealsDetailService;
//# sourceMappingURL=SeeMealsDetailService.js.map