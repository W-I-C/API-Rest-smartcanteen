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
exports.SeeMealsCartService = void 0;
/**
 * @module seeMealsCartService
 */
require('dotenv').config();
const db_1 = require("../../../config/db");
/**
 * Class responsible for the service that serves to see a meal at cart
 */
class SeeMealsCartService {
    /**
     * Method that allows you to see a meal at cart
     */
    execute(uId) {
        return __awaiter(this, void 0, void 0, function* () {
            const seeMealsCartDBClient = (0, db_1.createClient)();
            const queryUser = yield seeMealsCartDBClient.query('SELECT * from Cart WHERE uId=$1 AND iscompleted=$2', [uId, false]);
            const data = queryUser["rows"];
            return { data, status: 200 };
        });
    }
}
exports.SeeMealsCartService = SeeMealsCartService;
//# sourceMappingURL=seeMealCartService.js.map