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
exports.AddFavController = void 0;
const addFavService_1 = require("../../../services/consumer/favoriteMeal/addFavService");
/**
 * Class responsible for receiving and calling the methods of the service that allows the employee to add a meal to favoritemeal
 */
class AddFavController {
    /**
   * Allows to add a meal to favorite meal, redirecting afterwards to the associated service
   *
   * {@link removeMealService}
   * @param request request receive.
   * @param response response.
   */
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const uId = response.locals.uid;
            const mealId = request.params.mealId;
            try {
                if (uId === undefined ||
                    mealId === undefined) {
                    throw new Error("Invalid request");
                }
                const addFavService = new addFavService_1.AddFavService();
                const resp = yield addFavService.execute({
                    uId,
                    mealId
                });
                response.status(resp.status).json(resp.data);
            }
            catch (e) {
                response.status(500).json(e.message);
            }
        });
    }
}
exports.AddFavController = AddFavController;
//# sourceMappingURL=addFavController.js.map