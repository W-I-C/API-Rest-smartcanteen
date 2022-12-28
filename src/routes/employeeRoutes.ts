import express from "express";
import { validateToken } from "../middlewares/validateToken";
import { validateRefreshToken } from "../middlewares/validateRefreshToken";
const employeeRouter = express.Router();

import { CreateMealController } from "../controllers/employee/meal/createMealController";
import { EditMealController } from "../controllers/employee/meal/editMealController";
import { RemoveMealController } from "../controllers/employee/meal/removeMealController";
import { SeeUndeliveredTicketsController } from "../controllers/employee/ticket/seeUndeliveredTicketsController";
import { SeeDetailsMealTicketController } from "../controllers/employee/ticket/seeDetailsMealTicketController";

const createMealController = new CreateMealController();
const editMealController = new EditMealController();
const removeMealController = new RemoveMealController();
const seeUndeliveredTicketsController = new SeeUndeliveredTicketsController();
const seeDetailsMealTicketController=new SeeDetailsMealTicketController();


employeeRouter.post("/meal/:barId", validateToken, validateRefreshToken, createMealController.handle);
employeeRouter.put("/meal/:mealId", validateToken, validateRefreshToken, editMealController.handle);
employeeRouter.delete("/meal/:mealId", validateToken, validateRefreshToken, removeMealController.handle);
employeeRouter.get("/tickets", validateToken, validateRefreshToken, seeUndeliveredTicketsController.handle);
employeeRouter.get("/detail/ticket/:ticketId",validateToken, validateRefreshToken, seeDetailsMealTicketController.handle);


export { employeeRouter }