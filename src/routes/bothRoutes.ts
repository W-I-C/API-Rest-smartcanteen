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

const bothRouter = express.Router();

const seeProfileController = new SeeProfileController();
const editProfileController = new EditProfileController();
const loginController = new LoginController();
const newSessionToken = new NewSessionTokenController();
const logoutController = new LogoutController();
const seeMealsController = new SeeMealsController();
const seeMealsDetailController=new SeeMealsDetailController();
const seeDetailsMealTicketController = new SeeDetailsMealTicketController();

bothRouter.get("/profile", validateToken, validateRefreshToken, seeProfileController.handle);
bothRouter.put("/profile", validateToken, validateRefreshToken, editProfileController.handle);
bothRouter.post("/login", loginController.handle);
bothRouter.get("/newSessionToken", newSessionToken.handle);
bothRouter.get("/logout", validateToken, validateRefreshToken, logoutController.handle);


bothRouter.get("/meals/:mealid",validateToken, validateRefreshToken,seeMealsDetailController .handle);


// ver as refeições num bar
bothRouter.get("/meals/:barId",validateToken,validateRefreshToken, seeMealsController.handle);

bothRouter.get("/detail/ticket/:ticketId", validateToken, validateRefreshToken, seeDetailsMealTicketController.handle);

export { bothRouter };
