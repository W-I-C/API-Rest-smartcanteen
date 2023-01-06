"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bothRouter = void 0;
const express_1 = __importDefault(require("express"));
const seeProfileController_1 = require("../controllers/both/profile/seeProfileController");
const editProfileController_1 = require("../controllers/both/profile/editProfileController");
const loginController_1 = require("../controllers/both/auth/loginController");
const newSessionTokenController_1 = require("../controllers/both/auth/newSessionTokenController");
const validateToken_1 = require("../middlewares/validateToken");
const validateRefreshToken_1 = require("../middlewares/validateRefreshToken");
const logoutController_1 = require("../controllers/both/auth/logoutController");
const seeMealsController_1 = require("../controllers/both/meals/seeMealsController");
const seeMealsDetailContoller_1 = require("../controllers/both/meals/seeMealsDetailContoller");
const bothRouter = express_1.default.Router();
exports.bothRouter = bothRouter;
const seeProfileController = new seeProfileController_1.SeeProfileController();
const editProfileController = new editProfileController_1.EditProfileController();
const loginController = new loginController_1.LoginController();
const newSessionToken = new newSessionTokenController_1.NewSessionTokenController();
const logoutController = new logoutController_1.LogoutController();
const seeMealsController = new seeMealsController_1.SeeMealsController();
const seeMealsDetailController = new seeMealsDetailContoller_1.SeeMealsDetailController();
bothRouter.get("/profile", validateToken_1.validateToken, validateRefreshToken_1.validateRefreshToken, seeProfileController.handle);
bothRouter.put("/profile", validateToken_1.validateToken, validateRefreshToken_1.validateRefreshToken, editProfileController.handle);
bothRouter.post("/login", loginController.handle);
bothRouter.get("/newSessionToken", newSessionToken.handle);
bothRouter.get("/logout", validateToken_1.validateToken, validateRefreshToken_1.validateRefreshToken, logoutController.handle);
bothRouter.get("/meals/:mealid", validateToken_1.validateToken, validateRefreshToken_1.validateRefreshToken, seeMealsDetailController.handle);
// ver as refeições num bar
bothRouter.get("/meals/:barId", validateToken_1.validateToken, validateRefreshToken_1.validateRefreshToken, seeMealsController.handle);
//# sourceMappingURL=bothRoutes.js.map