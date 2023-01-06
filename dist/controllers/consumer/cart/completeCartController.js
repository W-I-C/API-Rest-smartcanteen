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
exports.CompleteCartController = void 0;
const completeCartService_1 = require("../../../services/consumer/cart/completeCartService");
/**
 * Class responsible for receiving and calling the service methods that allow the consumer to complete his cart
 */
class CompleteCartController {
    /**
   * Allows to complete cart, redirecting afterwards to the associated service
   *
   * {@link CompleteCartService}
   * @param request request receive.
   * @param response response.
   */
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const uId = response.locals.uid;
            const cartId = request.params.cartId;
            let { paymentmethodid, barid, ticketAmount, pickuptime, istakingaway } = request.body;
            try {
                if (uId === undefined ||
                    cartId === undefined ||
                    paymentmethodid === undefined ||
                    barid === undefined ||
                    pickuptime === undefined ||
                    istakingaway === undefined) {
                    throw new Error("Invalid request");
                }
                const completeCartService = new completeCartService_1.CompleteCartService();
                const resp = yield completeCartService.execute({ uId, paymentmethodid, barid, cartId, pickuptime, istakingaway }, ticketAmount);
                response.status(resp.status).json(resp.data);
            }
            catch (e) {
                response.status(500).json(e.message);
            }
        });
    }
}
exports.CompleteCartController = CompleteCartController;
//# sourceMappingURL=completeCartController.js.map