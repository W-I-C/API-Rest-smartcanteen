import express from "express";
import { CreateMealController } from "../controllers/employee/meal/createMealController";
const employeeRouter = express.Router();



const createMealController= new CreateMealController();



employeeRouter.post("/meal/:barId", createMealController.handle);



export {employeeRouter}