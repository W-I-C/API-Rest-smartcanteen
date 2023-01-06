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
exports.CanBeMadeService = void 0;
/**
 * @module canBeMadeService
 */
require('dotenv').config();
const db_1 = require("../../../config/db");
const editMealValidation_1 = require("../../../validations/employee/meal/editMealValidation");
/**
 * Class responsible for the service that serves to indicate that a meal cant be made
 */
class CanBeMadeService {
    /**
      * Method that allows you to indicate that a meal cant be made
      */
    execute(uid, mealId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const barId = yield (0, editMealValidation_1.getEmployeeBar)(uid);
            const canBeMadeDBClient = (0, db_1.createClient)();
            const mealExistsDBClient = (0, db_1.createClient)();
            const mealExistQuery = yield mealExistsDBClient.query('SELECT * from Meals WHERE mealid=$1', [mealId]);
            if (mealExistQuery.rowCount == 0) {
                return { data: { msg: "Meal doens't exist" }, status: 500 };
            }
            if (mealExistQuery.rows[0]['barid'] != barId) {
                return { data: { msg: "Not from the same bar" }, status: 500 };
            }
            yield canBeMadeDBClient.query('UPDATE meals SET canbemade=$1 WHERE mealid=$2', [status, mealId]);
            return { data: { msg: "Meal updated" }, status: 200 };
        });
    }
}
exports.CanBeMadeService = CanBeMadeService;
//# sourceMappingURL=canBeMadeService.js.map