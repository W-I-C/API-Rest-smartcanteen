import express from "express";
const consumerRoute = express.Router();



import { AddFavController } from "../controllers/consumer/FavoriteMeal/addFavController";
import { AddMealCartController } from "../controllers/consumer/cart/addMealCartController";


const addFavController = new AddFavController();
const addMealCartController= new AddMealCartController();



//adicionar aos favoritos refeição
consumerRoute.post("/:favoriteMealId", addFavController.handle);
consumerRoute.post("/:mealId", addMealCartController.handle);
