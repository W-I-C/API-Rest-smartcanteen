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
exports.SeeProfileController = void 0;
const seeProfileService_1 = require("../../../services/both/profile/seeProfileService");
/**
 * Class responsible for receiving and calling the methods of the service that allows the user to see the data from his profile
 */
class SeeProfileController {
    /**
     * Allows to obtain all the user's data, redirecting afterwards to the associated service
     *
     * {@link seeProfileService}
     * @param request request receive.
     * @param response response.
     */
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const uId = response.locals.uid;
            try {
                if (uId === undefined) {
                    throw new Error("Invalid request");
                }
                const seeProfileService = new seeProfileService_1.SeeProfileService();
                const resp = yield seeProfileService.execute(uId);
                response.status(resp.status).json(resp.data);
            }
            catch (e) {
                response.status(500).json(e.message);
            }
        });
    }
}
exports.SeeProfileController = SeeProfileController;
//# sourceMappingURL=seeProfileController.js.map