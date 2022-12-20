import express from "express";
import { SeeProfileController } from "../controllers/both/profile/seeProfileController";
import { EditProfileController } from "../controllers/both/profile/editProfileController";
import { LoginController } from "../controllers/both/auth/loginController";
import { NewSessionTokenController } from "../controllers/both/auth/newSessionTokenController";
import { validateToken } from "../middlewares/validateToken";
import { validateRefreshToken } from "../middlewares/validateRefreshToken";
import { LogoutController } from "../controllers/both/auth/logoutController";

const bothRouter = express.Router();

const seeProfileController = new SeeProfileController();
const editProfileController = new EditProfileController();
const loginController = new LoginController();
const newSessionToken = new NewSessionTokenController();
const logoutController = new LogoutController();

bothRouter.get("/profile", validateToken, validateRefreshToken, seeProfileController.handle);
bothRouter.put("/profile", validateToken, validateRefreshToken, editProfileController.handle);
bothRouter.post("/login", loginController.handle);
bothRouter.get("/newSessionToken", newSessionToken.handle);
bothRouter.get("/logout", validateToken, validateRefreshToken, logoutController.handle);

export { bothRouter };
