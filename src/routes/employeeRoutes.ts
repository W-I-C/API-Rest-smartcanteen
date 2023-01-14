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
import { EditTicketStateController } from "../controllers/employee/ticket/editTicketStateController";
import { GetBarStatisticsController } from "../controllers/employee/general/getBarStatisticsController";
import { GetBarMenuController } from "../controllers/employee/general/getBarMenuController";

const createMealController = new CreateMealController();
const editMealController = new EditMealController();
const removeMealController = new RemoveMealController();
const seeUndeliveredTicketsController = new SeeUndeliveredTicketsController();
const canBeMadeController = new CanBeMadeController();
const editTicketStateController = new EditTicketStateController();
const getBarStatisticsController = new GetBarStatisticsController();
const getBarMenuController = new GetBarMenuController();


employeeRouter.post("/meal/:barId", validateToken, validateRefreshToken, isEmployee, createMealController.handle);
employeeRouter.put("/meal/:mealId", validateToken, validateRefreshToken, isEmployee, editMealController.handle);
employeeRouter.delete("/meal/:mealId", validateToken, validateRefreshToken, isEmployee, removeMealController.handle);
employeeRouter.get("/tickets", validateToken, validateRefreshToken, isEmployee, seeUndeliveredTicketsController.handle);
employeeRouter.put("/meal/:mealId/canBeMade", validateToken, validateRefreshToken, isEmployee, canBeMadeController.handle);
employeeRouter.put("/tickets/:ticketId/:stateId", validateToken, validateRefreshToken, isEmployee, editTicketStateController.handle);

employeeRouter.get("/bar/statistics", validateToken, validateRefreshToken, isEmployee, getBarStatisticsController.handle);
employeeRouter.get("/bar/menu", validateToken, validateRefreshToken, isEmployee, getBarMenuController.handle);


export { employeeRouter }