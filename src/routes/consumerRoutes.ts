import express from "express";
const consumerRouter = express.Router();
import { validateToken } from "../middlewares/validateToken";
import { validateRefreshToken } from "../middlewares/validateRefreshToken";
import { isConsumer } from "../middlewares/isConsumer";

import { AddFavController } from "../controllers/consumer/favoriteMeal/addFavController";
import { AddMealCartController } from "../controllers/consumer/cart/addMealCartController";
import { SeeFavController } from "../controllers/consumer/favoriteMeal/seeFavController";
import { SeeOneFavController } from "../controllers/consumer/favoriteMeal/seeOneFavController";
import { RemoveFavController } from "../controllers/consumer/favoriteMeal/removeFavController";
import { SeeMealsCartController } from "../controllers/consumer/cart/seeMealCartController";
import { RemoveMealsCartController } from "../controllers/consumer/cart/removeMealsCartController";
import { SeeTradesHistoryController } from "../controllers/consumer/trades/seeTradesHistoryController";
import { RemoveTicketController } from "../controllers/consumer/ticket/removeTicketController";
import { SeeTicketsHistoryController } from "../controllers/consumer/ticket/seeTicketsHistoryController";
import { AcceptTradeController } from "../controllers/consumer/trades/acceptTradeController";
import { SeeTradesController } from "../controllers/consumer/trades/seeTradesController";
import { GetNotificationsController } from "../controllers/consumer/notifications/getNotificationsController";

const addFavController = new AddFavController();
const removeFavController = new RemoveFavController();
const seeFavController = new SeeFavController();
const seeOneFavController = new SeeOneFavController();
const addMealCartController = new AddMealCartController();
const seeMealsCartController = new SeeMealsCartController();
const removeMealsCartController = new RemoveMealsCartController();
const seeTradesHistoryController = new SeeTradesHistoryController();
const removeTicketController = new RemoveTicketController();
const seeTicketsHistoryController = new SeeTicketsHistoryController();
const acceptTradeController = new AcceptTradeController();
const seeTradesController = new SeeTradesController();
const getNotificationsController = new GetNotificationsController()

//adicionar aos favoritos refeição
consumerRouter.post("/favoriteMeals/:mealId", validateToken, validateRefreshToken, addFavController.handle);
consumerRouter.delete("/favoriteMeals/:favoriteMealId", validateToken, validateRefreshToken, removeFavController.handle);
consumerRouter.get("/favoriteMeals", validateToken, validateRefreshToken, seeFavController.handle);
consumerRouter.get("/favoriteMeals/:favoriteMealId", validateToken, validateRefreshToken, seeOneFavController.handle);

consumerRouter.post("/cart/:mealId", validateToken, validateRefreshToken, addMealCartController.handle);

consumerRouter.get("/cart/meals", validateToken, validateRefreshToken, seeMealsCartController.handle);

consumerRouter.delete("/meals/:cartMealId", validateToken, validateRefreshToken, removeMealsCartController.handle);

consumerRouter.get("/trades", validateToken, validateRefreshToken, seeTradesHistoryController.handle);
consumerRouter.delete("/tickets/:ticketId", validateToken, validateRefreshToken, removeTicketController.handle);
consumerRouter.delete("/tickets/:ticketId", validateToken, validateRefreshToken, removeTicketController.handle);
consumerRouter.get("/tickets", validateToken, validateRefreshToken, seeTicketsHistoryController.handle);
consumerRouter.put("/trades/:ticketId", validateToken, validateRefreshToken, acceptTradeController.handle);

consumerRouter.get("/trades/available", validateToken, validateRefreshToken, seeTradesController.handle);


consumerRouter.get("/notifications", validateToken, validateRefreshToken, isConsumer, getNotificationsController.handle);

export { consumerRouter }
