import express from "express";
import { CreateMealController } from "../controllers/employee/meal/createMealController";
import { validateToken } from "../middlewares/validateToken";
const employeeRouter = express.Router();



const createMealController = new CreateMealController();



employeeRouter.post("/meal/:barId", validateToken, createMealController.handle);



export { employeeRouter }