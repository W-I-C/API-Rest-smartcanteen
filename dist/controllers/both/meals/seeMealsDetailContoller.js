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
exports.SeeMealsDetailController = void 0;
const SeeMealsDetailService_1 = require("../../../services/both/meals/SeeMealsDetailService");
/**
 * Class responsible for receiving and calling the service methods that allow the user to see the details of a meal he has choose
 */
class SeeMealsDetailController {
    /**
* Allows to get a meal that the authenticated user has choose
*
* {@link seeMealsDetailService}
* @param request request receive.
* @param response response.
*/
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const uId = response.locals.uid;
            const mealId = request.params.mealid;
            try {
                const seeMealsDetailService = new SeeMealsDetailService_1.SeeMealsDetailService();
                const resp = yield seeMealsDetailService.execute(uId, mealId);
                response.status(resp.status).send(resp.data);
            }
            catch (e) {
                response.status(500).json(e.message);
            }
        });
    }
}
exports.SeeMealsDetailController = SeeMealsDetailController;
//# sourceMappingURL=seeMealsDetailContoller.js.map