import express from "express";
const consumerRouter = express.Router();
import { validateToken } from "../middlewares/validateToken";
import { validateRefreshToken } from "../middlewares/validateRefreshToken";


import { AddFavController } from "../controllers/consumer/favoriteMeal/addFavController";
import { AddMealCartController } from "../controllers/consumer/cart/addMealCartController";
import { SeeFavController } from "../controllers/consumer/favoriteMeal/seeFavController";
import { SeeOneFavController } from "../controllers/consumer/favoriteMeal/seeOneFavController";
import { RemoveFavController } from "../controllers/consumer/favoriteMeal/removeFavController";
import { SeeMealsCartController } from "../controllers/consumer/cart/seeMealCartController";
import { RemoveMealsCartController } from "../controllers/consumer/cart/removeMealsCartController";
import {SeeTicketsHistoryController} from "../controllers/consumer/Ticket/seeTicketsHistoryController"
import { SeeTicketsController } from "../controllers/consumer/Ticket/seeTicketsController";




const addFavController = new AddFavController();
const removeFavController = new RemoveFavController();
const seeFavController = new SeeFavController();
const seeOneFavController = new SeeOneFavController();
const addMealCartController= new AddMealCartController();
const seeMealsCartController=new SeeMealsCartController();
const removeMealsCartController= new RemoveMealsCartController();
const seeTicketsHistoryController= new SeeTicketsHistoryController();
const seeTicketsController= new SeeTicketsController();

//adicionar aos favoritos refeição
consumerRouter.post("/favoriteMeals/:mealId", validateToken, validateRefreshToken, addFavController.handle);
consumerRouter.delete("/favoriteMeals/:favoriteMealId", validateToken, validateRefreshToken, removeFavController.handle);
consumerRouter.get("/favoriteMeals", validateToken, validateRefreshToken, seeFavController.handle);
consumerRouter.get("/favoriteMeals/:favoriteMealId", validateToken, validateRefreshToken, seeOneFavController.handle);


consumerRouter.post("consumer/cart/:mealId", validateToken, validateRefreshToken,addMealCartController.handle);


consumerRouter.get("/cart/meals",validateToken, validateRefreshToken, seeMealsCartController.handle);
consumerRouter.delete("/meals/:cartMealId",validateToken, validateRefreshToken, removeMealsCartController.handle);

consumerRouter.get("/tickets",validateToken, validateRefreshToken, seeTicketsHistoryController.handle);
consumerRouter.get("/tickets/available",validateToken, validateRefreshToken, seeTicketsController.handle);


export { consumerRouter }
