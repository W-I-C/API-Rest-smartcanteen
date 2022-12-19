import express from "express";
const consumerRoute = express.Router();



import { AddFavController } from "../controllers/consumer/favoriteMeal/addFavController";
import { AddMealCartController } from "../controllers/consumer/cart/addMealCartController";


const addFavController = new AddFavController();
const addMealCartController= new AddMealCartController();



//adicionar aos favoritos refeição
consumerRoute.post("favoriteMeal/:favoriteMealId", addFavController.handle);
consumerRoute.post("/:mealId", addMealCartController.handle);
