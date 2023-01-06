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
exports.SeeMealsCartController = void 0;
const seeMealCartService_1 = require("../../../services/consumer/cart/seeMealCartService");
/**
 * Class responsible for receiving and calling the methods of the service that allows the consumer to see a meal at cart
 */
class SeeMealsCartController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
        * Allows to remove a meal, redirecting afterwards to the associated service
        *
        * {@link seeeMealsCartService}
        * @param response response.
        */
            const uId = response.locals.uid;
            try {
                const seeMealsCartService = new seeMealCartService_1.SeeMealsCartService();
                const resp = yield seeMealsCartService.execute(uId);
                response.status(resp.status).send(resp.data);
            }
            catch (e) {
                response.status(500).json(e.message);
            }
        });
    }
}
exports.SeeMealsCartController = SeeMealsCartController;
//# sourceMappingURL=seeMealCartController.js.map