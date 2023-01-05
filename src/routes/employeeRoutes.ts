import express from "express";
import { validateToken } from "../middlewares/validateToken";
import { validateRefreshToken } from "../middlewares/validateRefreshToken";
const employeeRouter = express.Router();

import { CreateMealController } from "../controllers/employee/meal/createMealController";
import { EditMealController } from "../controllers/employee/meal/editMealController";
import { RemoveMealController } from "../controllers/employee/meal/removeMealController";
import { SeeUndeliveredTicketsController } from "../controllers/employee/ticket/seeUndeliveredTicketsController";
import { isEmployee } from "../middlewares/isEmployee";
import { CanBeMadeController } from "../controllers/employee/meal/canBeMadeController";

const createMealController = new CreateMealController();
const editMealController = new EditMealController();
const removeMealController = new RemoveMealController();
const seeUndeliveredTicketsController = new SeeUndeliveredTicketsController();
const canBeMadeController = new CanBeMadeController();


employeeRouter.post("/meal/:barId", validateToken, validateRefreshToken, isEmployee, createMealController.handle);
employeeRouter.put("/meal/:mealId", validateToken, validateRefreshToken, isEmployee, editMealController.handle);
employeeRouter.delete("/meal/:mealId", validateToken, validateRefreshToken, isEmployee, removeMealController.handle);
employeeRouter.get("/tickets", validateToken, validateRefreshToken, isEmployee, seeUndeliveredTicketsController.handle);
employeeRouter.put("/meal/:mealId/canBeMade", validateToken, validateRefreshToken, isEmployee, canBeMadeController.handle);


export { employeeRouter }