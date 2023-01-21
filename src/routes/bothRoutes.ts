import express from "express";
import { SeeProfileController } from "../controllers/both/profile/seeProfileController";
import { EditProfileController } from "../controllers/both/profile/editProfileController";
import { LoginController } from "../controllers/both/auth/loginController";
import { NewSessionTokenController } from "../controllers/both/auth/newSessionTokenController";
import { validateToken } from "../middlewares/validateToken";
import { validateRefreshToken } from "../middlewares/validateRefreshToken";
import { LogoutController } from "../controllers/both/auth/logoutController";
import { SeeMealsController } from "../controllers/both/meals/seeMealsController";
import { SeeMealsDetailController } from "../controllers/both/meals/seeMealsDetailContoller";
import { SeeDetailsMealTicketController } from "../controllers/both/tickets/seeDetailsMealTicketController";
import { RegisterController } from "../controllers/both/auth/registerController";
import { GetCAmpusBarsController } from "../controllers/both/campus/getCampusBarsController";
import { SeePaymentMehodsController } from "../controllers/both/payments/seePaymentMethodsController";
import { SeeStatesController } from "../controllers/both/states/seeStatesController";
import { RegisterDeviceTokenController } from "../controllers/both/auth/registerDeviceTokenController";
import { SeeAllowedChangesController } from "../controllers/both/meals/seeAllowedChangesController";
import { GetCampusController } from "../controllers/both/campus/getCampusController";

const bothRouter = express.Router();

const seeProfileController = new SeeProfileController();
const editProfileController = new EditProfileController();
const loginController = new LoginController();
const newSessionToken = new NewSessionTokenController();
const logoutController = new LogoutController();
const seeMealsController = new SeeMealsController();
const seeMealsDetailController = new SeeMealsDetailController();
const seeDetailsMealTicketController = new SeeDetailsMealTicketController();
const registerController = new RegisterController();
const getCampusBarsController = new GetCAmpusBarsController();
const seePaymentMehodsController = new SeePaymentMehodsController();
const seeStatesController = new SeeStatesController();
const registerDeviceTokenController = new RegisterDeviceTokenController();
const seeAllowedChangesController = new SeeAllowedChangesController()

const getCampusController= new GetCampusController();

bothRouter.get("/campus",validateToken, validateRefreshToken,getCampusController.handle)
bothRouter.get("/profile", validateToken, validateRefreshToken, seeProfileController.handle);
bothRouter.put("/profile", validateToken, validateRefreshToken, editProfileController.handle);
bothRouter.post("/login", loginController.handle);
bothRouter.post("/register", registerController.handle);
bothRouter.get("/newSessionToken", validateRefreshToken, newSessionToken.handle);
bothRouter.get("/logout", validateToken, validateRefreshToken, logoutController.handle);


bothRouter.get("/meals/:mealid", validateToken, validateRefreshToken, seeMealsDetailController.handle);

bothRouter.get("/campus/bars", validateToken, validateRefreshToken, getCampusBarsController.handle)

// ver as refeições num bar
bothRouter.get("/bar/:barId/meals", validateToken, validateRefreshToken, seeMealsController.handle);

bothRouter.get("/ticket/:ticketId/detail", validateToken, validateRefreshToken, seeDetailsMealTicketController.handle);
bothRouter.get("/paymentmethods", validateToken, validateRefreshToken, seePaymentMehodsController.handle);
bothRouter.get("/states", validateToken, validateRefreshToken, seeStatesController.handle);

bothRouter.post("/device", validateToken, validateRefreshToken, registerDeviceTokenController.handle);

bothRouter.get("/meals/:mealId/allowedChanges", validateToken, validateRefreshToken, seeAllowedChangesController.handle);

export { bothRouter };
