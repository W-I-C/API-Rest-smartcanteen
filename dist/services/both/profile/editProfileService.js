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
exports.EditProfileService = void 0;
/**
 * @module editProfileService
 */
require('dotenv').config();
const db_1 = require("../../../config/db");
const editProfileValidation_1 = require("../../../validations/both/profile/editProfileValidation");
/**
 * Class responsible for the service that serves to edit the profile of the authenticated user
 */
class EditProfileService {
    /**
     * Method that allows editing the authenticated user's profile data
     */
    execute({ uId, preferredCampus, preferredBar, imgUrl }) {
        return __awaiter(this, void 0, void 0, function* () {
            const editProfileDBClient = (0, db_1.createClient)();
            const editProfileVallidator = new editProfileValidation_1.EditProfileValidator();
            const resp = yield editProfileVallidator.validate(preferredCampus, preferredBar);
            const campusBar = yield (0, editProfileValidation_1.getCampusBar)(preferredBar);
            if (resp && campusBar == preferredCampus) {
                const query = yield editProfileDBClient.query(`UPDATE users
                                                        SET preferredcampus = $1, preferredBar = $2, imgurl = $3   
                                                        WHERE users.uid = $4`, [preferredCampus, preferredBar, imgUrl, uId]);
                const query_edited = yield editProfileDBClient.query(`SELECT preferredcampus, preferredBar, imgurl
                                                                FROM users
                                                                WHERE users.uid = $1`, [uId]);
                const data = query_edited["rows"][0];
                console.log(data);
                return { data, status: 200 };
            }
            else {
                return { msg: "Invalid Data", status: 404 };
            }
        });
    }
}
exports.EditProfileService = EditProfileService;
//# sourceMappingURL=editProfileService.js.map