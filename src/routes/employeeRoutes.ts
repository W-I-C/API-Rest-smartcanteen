import express from "express";
import { validateToken } from "../middlewares/validateToken";
import { validateRefreshToken } from "../middlewares/validateRefreshToken";
const employeeRouter = express.Router();

import { CreateMealController } from "../controllers/employee/meal/createMealController";
import { EditMealController } from "../controllers/employee/meal/editMealController";
import { RemoveMealController } from "../controllers/employee/meal/removeMealController";

const createMealController = new CreateMealController();
const editMealController = new EditMealController();
const removeMealController = new RemoveMealController();

employeeRouter.post("/meal/:barId", validateToken, validateRefreshToken, createMealController.handle);


employeeRouter.put("/meal/:mealId", validateToken, validateRefreshToken, editMealController.handle);
employeeRouter.delete("/meal/:mealId", validateToken, validateRefreshToken, removeMealController.handle);



export { employeeRouter }