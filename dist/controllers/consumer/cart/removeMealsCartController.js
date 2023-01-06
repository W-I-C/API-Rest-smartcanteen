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
exports.RemoveMealsCartController = void 0;
const removeMealCartService_1 = require("../../../services/consumer/cart/removeMealCartService");
/**
 * Class responsible for receiving and calling the service methods that allows you remove a meal from a cart
 */
class RemoveMealsCartController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
        * Allows to get a cart meal that the authenticated user has already added to his cart
        *
        * {@link seeOneFavService}
        * @param request request receive.
        * @param response response.
        */
            const uId = response.locals.uid;
            const cartMealId = request.params.cartMealId;
            try {
                if (uId === undefined || cartMealId === undefined) {
                    throw new Error("Invalid request");
                }
                const removeMealsCartService = new removeMealCartService_1.RemoveMealsCartService();
                const resp = yield removeMealsCartService.execute(cartMealId, uId);
                response.status(resp.status).json(resp.data);
            }
            catch (e) {
                response.status(500).json(e.message);
            }
        });
    }
}
exports.RemoveMealsCartController = RemoveMealsCartController;
//# sourceMappingURL=removeMealsCartController.js.map