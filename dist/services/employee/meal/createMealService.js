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
exports.CreateMealService = void 0;
/**
 * @module createMealService
 */
require('dotenv').config();
const db_1 = require("../../../config/db");
const seeMealsValidation_1 = require("../../../validations/both/meals/seeMealsValidation");
const editMealValidation_1 = require("../../../validations/employee/meal/editMealValidation");
/**
 * Class responsible for the service that serves to create meals in bar
 */
class CreateMealService {
    /**
      * Method that allows you to get the details of a meal that the employee from bar can create
      */
    execute({ uId, barId, name, preparationTime, description, canTakeaway, price, allowedChanges }) {
        return __awaiter(this, void 0, void 0, function* () {
            const createMealDBClient = (0, db_1.createClient)();
            const barExists = yield (0, seeMealsValidation_1.checkBarExists)(barId);
            if (!barExists) {
                throw new Error('Bar dont exist');
            }
            const userBar = yield (0, editMealValidation_1.getEmployeeBar)(uId);
            if (userBar != barId) {
                throw new Error('Bars are not the same');
            }
            const mealExist = yield createMealDBClient.query('SELECT * from Meals WHERE name=$1 AND barId=$2', [name, barId]);
            if (mealExist.rowCount > 0) {
                throw new Error('Meal already exists');
            }
            const createMeals = yield createMealDBClient.query('INSERT INTO Meals (name, preparationTime,description,canTakeaway,price,barId) VALUES ($1,$2,$3,$4,$5,$6)', [name, preparationTime, description, canTakeaway, price, barId]);
            const selectId = yield createMealDBClient.query('SELECT mealId from Meals WHERE name=$1 AND barId=$2', [name, barId]);
            const mealId = selectId["rows"][0]["mealid"];
            allowedChanges.forEach((currentvalue, index, array) => __awaiter(this, void 0, void 0, function* () {
                const allowchanges = yield createMealDBClient.query('INSERT INTO allowedchanges (mealId,ingname,ingdosage,isremoveonly,canbeincremented,canbedecremented,incrementlimit,decrementlimit) VALUES($1,$2,$3,$4,$5,$6,$7,$8)', [mealId, currentvalue.ingname, currentvalue.ingdosage, currentvalue.isremoveonly, currentvalue.canbeincremented, currentvalue.canbedecremented, currentvalue.incrementlimit, currentvalue.decrementlimit]);
            }));
            const selectmeal = yield createMealDBClient.query('SELECT * from Meals WHERE mealid=$1', [mealId]);
            let meal = selectmeal["rows"][0];
            const selectAllowed = yield createMealDBClient.query('SELECT changeid,mealid,ingname,ingdosage,isremoveonly,canbeincremented,canbedecremented,incrementlimit,decrementlimit from allowedchanges WHERE mealid=$1', [mealId]);
            meal["allowedchanges"] = selectAllowed["rows"];
            return { meal, status: 200 };
        });
    }
}
exports.CreateMealService = CreateMealService;
//# sourceMappingURL=createMealService.js.map