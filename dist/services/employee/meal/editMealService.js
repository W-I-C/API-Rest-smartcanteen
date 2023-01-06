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
exports.EditMealService = void 0;
/**
 * @module editMealService
 */
require('dotenv').config();
const db_1 = require("../../../config/db");
const editMealValidation_1 = require("../../../validations/employee/meal/editMealValidation");
/**
 * Class responsible for the service that serves to edit the data of a meal
 */
class EditMealService {
    /**
     * Method that allows you to edit the data of a meal
     */
    execute({ uId, mealId, name, preparationTime, description, canTakeaway, price, allowedChanges }) {
        return __awaiter(this, void 0, void 0, function* () {
            const mealIdExists = yield (0, editMealValidation_1.checkMealExists)(mealId);
            if (!mealIdExists) {
                throw new Error('Meal does not exists');
            }
            // get the bar where the employee works
            const userBarId = yield (0, editMealValidation_1.getEmployeeBar)(uId);
            const mealBarId = yield (0, editMealValidation_1.getMealBar)(mealId);
            if (userBarId != mealBarId) {
                throw new Error('Bars are not the same');
            }
            // check if a meal already exists in that bar (they can't be repeated)
            const meal = yield (0, editMealValidation_1.checkMealExistsBar)(name, userBarId);
            if (meal) {
                throw new Error('Meal already exists in this bar');
            }
            const editMealDBClient = (0, db_1.createClient)();
            yield editMealDBClient.query(`UPDATE meals
                                    SET name = $1, preparationTime = $2, description = $3, canTakeAway = $4, price = $5
                                    WHERE mealid = $6`, [name, preparationTime, description, canTakeaway, price, mealId]);
            yield editMealDBClient.query(`DELETE FROM allowedchanges 
                                    WHERE mealid = $1`, [mealId]);
            allowedChanges.forEach((currentvalue, index, array) => __awaiter(this, void 0, void 0, function* () {
                yield editMealDBClient.query(`INSERT INTO allowedchanges (mealid,ingname,ingdosage,isremoveonly,canbeincremented,canbedecremented,incrementlimit,decrementlimit) 
                                        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`, [mealId, currentvalue.ingname, currentvalue.ingdosage, currentvalue.isremoveonly, currentvalue.canbedecremented, currentvalue.canbedecremented, currentvalue.incrementlimit, currentvalue.decrementlimit]);
            }));
            const query = yield editMealDBClient.query(`SELECT meals.name, meals.preparationTime, meals.description, meals.canTakeAway, meals.price
                                                FROM meals
                                                WHERE mealid = $1`, [mealId]);
            let editedMeal = query["rows"][0];
            const queryAllowedChanges = yield editMealDBClient.query(`SELECT ingname, ingdosage, isremoveonly, canbeincremented, canbedecremented, incrementlimit, decrementlimit
                                                                FROM allowedchanges
                                                                WHERE mealid = $1`, [mealId]);
            editedMeal["allowedChanges"] = queryAllowedChanges["rows"];
            return { editedMeal, status: 200 };
        });
    }
}
exports.EditMealService = EditMealService;
//# sourceMappingURL=editMealService.js.map