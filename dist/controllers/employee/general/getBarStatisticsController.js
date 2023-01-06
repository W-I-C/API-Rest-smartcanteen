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
exports.GetBarStatisticsController = void 0;
const getBarStatisticsService_1 = require("../../../services/employee/general/getBarStatisticsService");
/**
 * Class responsible for receiving and calling the service methods that allow the employee to get bar statistics
 */
class GetBarStatisticsController {
    /**
   * Allows to get user bar statistics, redirecting afterwards to the associated service
   *
   * {@link getBarStatisticsService}
   * @param request request receive.
   * @param response response.
   */
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const barId = request.params.barId;
            const uId = response.locals.uid;
            try {
                if (barId === undefined) {
                    throw new Error("Some parameter is incorrect");
                }
                const getBarStatisticsController = new getBarStatisticsService_1.GetBarStatisticsService();
                const resp = yield getBarStatisticsController.execute(uId, barId);
                response.status(resp.status).json(resp.data);
            }
            catch (e) {
                response.status(500).json(e.message);
            }
        });
    }
}
exports.GetBarStatisticsController = GetBarStatisticsController;
//# sourceMappingURL=getBarStatisticsController.js.map