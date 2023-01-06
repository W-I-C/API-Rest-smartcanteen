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
exports.AddMealCartController = void 0;
const addMealCartService_1 = require("../../../services/consumer/cart/addMealCartService");
/**
 * Class responsible for receiving and calling the service methods that allow the consumer to add a meal in his cart
 */
class AddMealCartController {
    /**
   * Allows to get a meal that the authenticated user has already added to favorites, redirecting afterwards to the associated service
   *
   * {@link addMealCartService}
   * @param request request receive.
   * @param response response.
   */
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const uId = response.locals.uid;
            const mealId = request.params.mealId;
            let { amount, changes } = request.body;
            try {
                if (uId === undefined ||
                    mealId === undefined ||
                    amount === undefined ||
                    typeof amount != "number") {
                    throw new Error("Invalid request");
                }
                const addMealCartService = new addMealCartService_1.AddMealCartService();
                const resp = yield addMealCartService.execute(mealId, uId, amount, changes);
                response.status(resp.status).json(resp.data);
            }
            catch (e) {
                response.status(500).json(e.message);
            }
        });
    }
}
exports.AddMealCartController = AddMealCartController;
//# sourceMappingURL=addMealCartController.js.map