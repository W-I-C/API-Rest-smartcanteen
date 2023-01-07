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
exports.RegisterService = void 0;
/**
 * @module registerService
 */
require('dotenv').config();
const db_1 = require("../../../config/db");
const bcrypt_1 = require("bcrypt");
/**
 * class responsible for registering a user
 */
class RegisterService {
    /**
       * Method that allows you to register a user
       * @param roleid role id
       * @param preferredcampus preferred campus
       * @param preferredbar preferred bar
       * @param email email
       * @param name name
       * @param password password
       * @param schoolno school number
       * @param birthdate birthdate
       * @param imgurl profile picture url
       */
    execute({ roleid, preferredcampus, preferredbar, email, name, password, schoolno, birthdate, imgurl }) {
        return __awaiter(this, void 0, void 0, function* () {
            const registerDBClient = (0, db_1.createClient)();
            const emailQuery = yield registerDBClient.query('SELECT * from users WHERE email=$1 ', [email]);
            if (emailQuery['rows'].length >= 1) {
                throw new Error("Email already registered");
            }
            const schoolnoQuery = yield registerDBClient.query('SELECT * from users WHERE schoolno=$1 ', [schoolno]);
            if (schoolnoQuery['rows'].length >= 1) {
                throw new Error("School number already registered");
            }
            //password encryption
            let passwd = yield (0, bcrypt_1.hash)(password, 8);
            yield registerDBClient.query(`INSERT INTO users(roleid, preferredcampus, preferredbar, email, name, password, schoolno, birthdate, imgurl)
                                   VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`, [roleid, preferredcampus, preferredbar, email, name, passwd, schoolno, birthdate, imgurl]);
            return { status: 200, data: { msg: "User Registered Successfully" } };
        });
    }
}
exports.RegisterService = RegisterService;
//# sourceMappingURL=registerService.js.map