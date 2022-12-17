import express from "express";
import { SeeProfileController } from "../controllers/both/profile/seeProfileController";

const bothRouter = express.Router();

const seeProfileController = new SeeProfileController();

bothRouter.get("/:uid/profile", seeProfileController.handle);

export { bothRouter };
