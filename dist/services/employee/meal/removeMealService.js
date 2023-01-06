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
exports.RemoveMealService = void 0;
/**
 * @module removeMealService
 */
require('dotenv').config();
const db_1 = require("../../../config/db");
const editMealValidation_1 = require("../../../validations/employee/meal/editMealValidation");
const removeMealValidation_1 = require("../../../validations/employee/meal/removeMealValidation");
/**
 * Class responsible for the service that serves to remove a meal
 */
class RemoveMealService {
    /**
     * Method that allows you to remove a meal
     */
    execute({ uId, mealId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const mealIdExists = yield (0, removeMealValidation_1.checkMealExists)(mealId);
            if (!mealIdExists) {
                throw new Error('Meal does not exists');
            }
            const userBarId = yield (0, removeMealValidation_1.getEmployeeBar)(uId);
            const mealBarId = yield (0, editMealValidation_1.getMealBar)(mealId);
            if (userBarId != mealBarId) {
                throw new Error('Bars are not the same');
            }
            const removeMealDBClient = (0, db_1.createClient)();
            const mealCart = yield (0, removeMealValidation_1.checkMealCartExists)(mealId);
            if (!mealCart == true) {
                yield removeMealDBClient.query(`UPDATE meals
                                        SET isdeleted = $1
                                        WHERE mealid = $2`, [true, mealId]);
            }
            else {
                throw new Error('Impossible to remove the meal');
            }
            return { msg: "Meal successfully removed", status: 200 };
        });
    }
}
exports.RemoveMealService = RemoveMealService;
//# sourceMappingURL=removeMealService.js.map