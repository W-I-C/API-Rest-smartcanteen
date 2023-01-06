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
exports.CreateMealController = void 0;
const createMealService_1 = require("../../../services/employee/meal/createMealService");
/**
 * Class responsible for receiving and calling the service methods that allow the employee to create a meal in a bar
 */
class CreateMealController {
    /**
   * Allows to get a meal that the authenticated user has already added to favorites, redirecting afterwards to the associated service
   *
   * {@link createmealService}
   * @param request request receive.
   * @param response response.
   */
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const barId = request.params.barId;
            const uId = response.locals.uid;
            let { name, preparationTime, description, canTakeaway, price, allowedChanges } = request.body;
            try {
                if (barId === undefined ||
                    name === undefined ||
                    preparationTime === undefined ||
                    description === undefined ||
                    canTakeaway === undefined ||
                    price === undefined ||
                    allowedChanges === undefined ||
                    typeof preparationTime != "number" ||
                    typeof canTakeaway != "boolean" ||
                    typeof price != "number") {
                    throw new Error("Some parameter is incorrect");
                }
                const createMealService = new createMealService_1.CreateMealService();
                const resp = yield createMealService.execute({
                    uId,
                    barId,
                    name,
                    preparationTime,
                    description,
                    canTakeaway,
                    price,
                    allowedChanges
                });
                response.status(resp.status).json(resp.meal);
            }
            catch (e) {
                response.status(500).json(e.message);
            }
        });
    }
}
exports.CreateMealController = CreateMealController;
//# sourceMappingURL=createMealController.js.map