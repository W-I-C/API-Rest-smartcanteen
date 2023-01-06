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
exports.CanBeMadeController = void 0;
const canBeMadeService_1 = require("../../../services/employee/meal/canBeMadeService");
/**
 * Class responsible for receiving and calling the service methods that allow the employee to indicate if the meal can be made
 */
class CanBeMadeController {
    /**
   * Allows to indicate that a meal cant be made, redirecting afterwards to the associated service
   *
   * {@link canBeMadeService}
   * @param request request receive.
   * @param response response.
   */
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const mealId = request.params.mealId;
            const uid = response.locals.uid;
            let { status } = request.body;
            if (status === undefined || mealId === undefined || typeof status != "boolean") {
                response.status(500).send({ msg: "Some parameter is incorrect" });
            }
            else {
                const canBeMadeService = new canBeMadeService_1.CanBeMadeService();
                const resp = yield canBeMadeService.execute(uid, mealId, status);
                response.status(resp.status).json(resp.data);
            }
        });
    }
}
exports.CanBeMadeController = CanBeMadeController;
//# sourceMappingURL=canBeMadeController.js.map