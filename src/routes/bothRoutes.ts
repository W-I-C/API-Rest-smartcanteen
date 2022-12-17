import express, {Request, Response} from "express";

import { SeeProfileController } from "../controllers/profile/seeProfileController";
const bothRouter = express.Router();

const seeProfileController = new SeeProfileController();

bothRouter.get("/:userId/profile", seeProfileController.handle);


export {bothRouter};