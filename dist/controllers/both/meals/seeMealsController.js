"use strict";
/**
 * @module seeMealsController
 */
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
exports.SeeMealsController = void 0;
const seeMealsService_1 = require("../../../services/both/meals/seeMealsService");
/**
 * Class responsible for receiving and calling the methods of the service that allows both see meals from bar
 */
class SeeMealsController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const barId = request.params.barId;
            const uId = response.locals.uid;
            try {
                if (barId === undefined) {
                    throw new Error("Invalid request");
                }
                const seeMealsService = new seeMealsService_1.SeeMealsService();
                const resp = yield seeMealsService.execute(barId, uId);
                response.status(resp.status).send(resp.data);
            }
            catch (e) {
                response.status(500).json(e.message);
            }
        });
    }
}
exports.SeeMealsController = SeeMealsController;
//# sourceMappingURL=seeMealsController.js.map