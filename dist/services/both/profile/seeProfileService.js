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
exports.SeeProfileService = void 0;
/**
 * @module seeProfileService
 */
require('dotenv').config();
const db_1 = require("../../../config/db");
/**
 * Class responsible for the service that serves to obtain the profile data of the authenticated user
 */
class SeeProfileService {
    /**
     * Method that allows getting the authenticated user's profile data
     * @param uId authenticated user id
     */
    execute(uId) {
        return __awaiter(this, void 0, void 0, function* () {
            const seeProfileDBClient = (0, db_1.createClient)();
            const query = yield seeProfileDBClient.query(`SELECT users.name, campus.name AS campusName, bar.name AS barName, users.imgurl 
                                                        FROM users 
                                                        JOIN campus ON users.preferredCampus = campus.campusid 
                                                        JOIN bar ON users.preferredBar = bar.barid 
                                                        WHERE users.uid = $1`, [uId]);
            const data = query["rows"][0];
            return { data, status: 200 };
        });
    }
}
exports.SeeProfileService = SeeProfileService;
//# sourceMappingURL=seeProfileService.js.map