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
exports.EditMealController = void 0;
const editMealService_1 = require("../../../services/employee/meal/editMealService");
/**
 * Class responsible for receiving and calling the methods of the service that allows the employee to edit a meal
 */
class EditMealController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Allows to edit a meal, redirecting afterwards to the associated service
             *
             * {@link editMealService}
             * @param request request receive.
             * @param response response.
             */
            const uId = response.locals.uid;
            const mealId = request.params.mealId;
            let { name, preparationTime, description, canTakeaway, price, allowedChanges } = request.body;
            try {
                if (uId === undefined ||
                    mealId === undefined ||
                    name === undefined ||
                    preparationTime === undefined ||
                    description === undefined ||
                    canTakeaway === undefined ||
                    price === undefined ||
                    allowedChanges === undefined ||
                    typeof preparationTime != "number" ||
                    typeof canTakeaway != "boolean" ||
                    typeof price != "number") {
                    throw new Error("Invalid request");
                }
                const editMealService = new editMealService_1.EditMealService();
                const resp = yield editMealService.execute({
                    uId,
                    mealId,
                    name,
                    preparationTime,
                    description,
                    canTakeaway,
                    price,
                    allowedChanges
                });
                response.status(resp.status).json(resp.editedMeal);
            }
            catch (e) {
                response.status(500).json(e.message);
            }
        });
    }
}
exports.EditMealController = EditMealController;
//# sourceMappingURL=editMealController.js.map