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
exports.RemoveMealController = void 0;
const removeMealService_1 = require("../../../services/employee/meal/removeMealService");
/**
 * Class responsible for receiving and calling the methods of the service that allows the employee to remove a meal
 */
class RemoveMealController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Allows to remove a meal, redirecting afterwards to the associated service
             *
             * {@link removeMealService}
             * @param request request receive.
             * @param response response.
             */
            const uId = response.locals.uid;
            const mealId = request.params.mealId;
            try {
                if (uId === undefined ||
                    mealId === undefined) {
                    throw new Error("Pedido inválido");
                }
                const removeMealService = new removeMealService_1.RemoveMealService();
                const resp = yield removeMealService.execute({
                    uId,
                    mealId,
                });
                response.status(resp.status).json(resp.msg);
            }
            catch (e) {
                response.status(500).json(e.message);
            }
        });
    }
}
exports.RemoveMealController = RemoveMealController;
//# sourceMappingURL=removeMealController.js.map