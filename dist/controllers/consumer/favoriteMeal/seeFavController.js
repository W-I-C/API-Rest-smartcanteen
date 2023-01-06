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
exports.SeeFavController = void 0;
const seeFavService_1 = require("../../../services/consumer/favoriteMeal/seeFavService");
/**
 * Class responsible for receiving and calling the service methods that allow the user to see all the meals he has already added to favorites
 */
class SeeFavController {
    /**
     * Allows to get all meals that the authenticated user has already added to favorites, redirecting afterwards to the associated service
     *
     * {@link seeFavService}
     * @param request request receive.
     * @param response response.
     */
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const uId = response.locals.uid;
            try {
                if (uId === undefined) {
                    throw new Error("Invalid request");
                }
                const seeFavService = new seeFavService_1.SeeFavService();
                const resp = yield seeFavService.execute(uId);
                response.status(resp.status).json(resp.data);
            }
            catch (e) {
                response.status(500).json(e.message);
            }
        });
    }
}
exports.SeeFavController = SeeFavController;
//# sourceMappingURL=seeFavController.js.map