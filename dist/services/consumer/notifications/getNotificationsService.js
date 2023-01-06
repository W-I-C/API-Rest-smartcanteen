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
exports.GetNotificiationsService = void 0;
/**
 * @module getNotificationsService
 */
require('dotenv').config();
const db_1 = require("../../../config/db");
/**
 * Class responsible for the service that serves to get all the notifications of the authenticated user
 */
class GetNotificiationsService {
    /**
     * Method that allows the authenticated user to get all his notifications
     *
     * @param uId authenticated user id
     */
    execute(uId) {
        return __awaiter(this, void 0, void 0, function* () {
            const getNotificationsDBClient = (0, db_1.createClient)();
            const query = yield getNotificationsDBClient.query(`SELECT * FROM Notifications WHERE receiverid=$1`, [uId]);
            const data = query["rows"];
            return { data, status: 200 };
        });
    }
}
exports.GetNotificiationsService = GetNotificiationsService;
//# sourceMappingURL=getNotificationsService.js.map