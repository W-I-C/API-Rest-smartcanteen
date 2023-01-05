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
exports.SeeFavService = void 0;
/**
 * @module seeFavService
 */
require('dotenv').config();
const db_1 = require("../../../config/db");
/**
 * Class responsible for the service that serves to get all the meals that the authenticated user has already added to favorites
 */
class SeeFavService {
    /**
     * Method that allows you to get all meals from the authenticated user
     * @param uId authenticated user id
     */
    execute(uId) {
        return __awaiter(this, void 0, void 0, function* () {
            const seeFavDBClient = (0, db_1.createClient)();
            const query = yield seeFavDBClient.query(`SELECT meals.name, meals.preparationtime, meals.price, mealimages.url 
                                            FROM favoritemeals 
                                            JOIN meals ON favoritemeals.mealid = meals.mealid 
                                            LEFT JOIN mealimages ON meals.mealid = mealimages.mealid 
                                            WHERE favoritemeals.uid = $1`, [uId]);
            const data = query["rows"];
            return { data, status: 200 };
        });
    }
}
exports.SeeFavService = SeeFavService;
//# sourceMappingURL=seeFavService.js.map