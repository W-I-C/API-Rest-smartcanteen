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
exports.SeeOneFavController = void 0;
const seeOneFavService_1 = require("../../../services/consumer/favoriteMeal/seeOneFavService");
/**
 * Class responsible for receiving and calling the service methods that allow the user to see the details of a meal he has already added to favorites
 */
class SeeOneFavController {
    /**
     * Allows to get a meal that the authenticated user has already added to favorites, redirecting afterwards to the associated service
     *
     * {@link seeOneFavService}
     * @param request request receive.
     * @param response response.
     */
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const uId = response.locals.uid;
            const favMealId = request.params.favoriteMealId;
            try {
                if (uId === undefined || favMealId == undefined) {
                    throw new Error("Invalid request");
                }
                const seeOneFavService = new seeOneFavService_1.SeeOneFavService();
                const resp = yield seeOneFavService.execute(uId, favMealId);
                response.status(resp.status).json(resp.data);
            }
            catch (e) {
                response.status(500).json(e.message);
            }
        });
    }
}
exports.SeeOneFavController = SeeOneFavController;
//# sourceMappingURL=seeOneFavController.js.map