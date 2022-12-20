import express from "express";
import { CreateMealController } from "../controllers/employee/meal/createMealController";
import { validateToken } from "../middlewares/validateToken";
import { validateRefreshToken } from "../middlewares/validateRefreshToken";
const employeeRouter = express.Router();



const createMealController = new CreateMealController();



employeeRouter.post("/meal/:barId", validateToken, validateRefreshToken, createMealController.handle);



export { employeeRouter }