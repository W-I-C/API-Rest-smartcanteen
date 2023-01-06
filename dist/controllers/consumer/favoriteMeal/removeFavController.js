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
exports.RemoveFavController = void 0;
const removeFavService_1 = require("../../../services/consumer/favoriteMeal/removeFavService");
/**
 * Class responsible for receiving and calling the service methods that allow the user to remove a meal from favorites
 */
class RemoveFavController {
    /**
   * Allows you to remove a meal from the favorites, redirecting afterwards to the associated service
   *
   * {@link removeFavService}
   * @param request request receive.
   * @param response response.
   */
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const uId = response.locals.uid;
            const favMealId = request.params.favoriteMealId;
            try {
                if (uId === undefined || favMealId === undefined) {
                    throw new Error("Invalid request");
                }
                const removeFavService = new removeFavService_1.RemoveFavService();
                const resp = yield removeFavService.execute(uId, favMealId);
                response.status(resp.status).json(resp.data);
            }
            catch (e) {
                response.status(500).json(e.message);
            }
        });
    }
}
exports.RemoveFavController = RemoveFavController;
//# sourceMappingURL=removeFavController.js.map