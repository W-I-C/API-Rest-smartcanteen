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
exports.isConsumer = void 0;
/**
 * Consumer role verification middleware
 *
 * @param request request received
 * @param response response objecet
 * @param next next function to execute
 */
function isConsumer(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const role = response.locals.role;
        if (role === 'consumer') {
            next();
        }
        else {
            response.status(401).send({ Error: "Unauthorized Request" });
        }
    });
}
exports.isConsumer = isConsumer;
//# sourceMappingURL=isConsumer.js.map