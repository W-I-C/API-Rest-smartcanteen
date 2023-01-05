"use strict";
/**
 * @module seeMealsService
 */
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
exports.SeeMealsService = void 0;
require('dotenv').config();
const db_1 = require("../../../config/db");
/**
 * @param uId authenticated user id
 * @param barId id of the bar to see the meals
 */
/**
 * Class responsible for the service that serves to see the meals in bar
 */
class SeeMealsService {
    /**
    * Method that allows you to see a meals from bar
    */
    execute(barId, uId) {
        return __awaiter(this, void 0, void 0, function* () {
            const seeMeals = (0, db_1.createClient)();
            const query = yield seeMeals.query('SELECT * from Meals WHERE barId=($1)', [barId]);
            const data = query["rows"];
            return { data, status: 200 };
        });
    }
}
exports.SeeMealsService = SeeMealsService;
//# sourceMappingURL=seeMealsService.js.map