import express from "express";
import { validateToken } from "../middlewares/validateToken";
import { validateRefreshToken } from "../middlewares/validateRefreshToken";
const employeeRouter = express.Router();

import { CreateMealController } from "../controllers/employee/meal/createMealController";
import { EditMealController } from "../controllers/employee/meal/editMealController";
import { RemoveMealController } from "../controllers/employee/meal/removeMealController";
import { SeeUndeliveredTicketsController } from "../controllers/employee/ticket/seeUndeliveredTicketsController";

const createMealController = new CreateMealController();
const editMealController = new EditMealController();
const removeMealController = new RemoveMealController();
const seeUndeliveredTicketsController = new SeeUndeliveredTicketsController();

employeeRouter.post("/meal/:barId", validateToken, validateRefreshToken, createMealController.handle);
employeeRouter.put("/meal/:mealId", validateToken, validateRefreshToken, editMealController.handle);
employeeRouter.delete("/meal/:mealId", validateToken, validateRefreshToken, removeMealController.handle);
employeeRouter.get("/tickets", validateToken, validateRefreshToken, seeUndeliveredTicketsController.handle);



export { employeeRouter }