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
exports.EditProfileController = void 0;
const editProfileService_1 = require("../../../services/both/profile/editProfileService");
/**
 * Class responsible for receiving and calling the methods of the service that allows the user to edit his profile
 */
class EditProfileController {
    /**
     * Allows to edit the authenticated user's profile data, redirecting afterwards to the associated service
     *
     * {@link editProfileService}
     * @param request request receive.
     * @param response response.
     */
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const uId = response.locals.uid;
            let { preferredCampus, preferredBar, imgUrl } = request.body;
            try {
                if (uId === undefined || preferredCampus === undefined || preferredBar === undefined || imgUrl === undefined) {
                    throw new Error("Invalid request");
                }
                const editProfileService = new editProfileService_1.EditProfileService();
                const resp = yield editProfileService.execute({ uId, preferredCampus, preferredBar, imgUrl });
                response.status(resp.status).json(resp.data);
            }
            catch (e) {
                response.status(500).json(e.message);
            }
        });
    }
}
exports.EditProfileController = EditProfileController;
//# sourceMappingURL=editProfileController.js.map