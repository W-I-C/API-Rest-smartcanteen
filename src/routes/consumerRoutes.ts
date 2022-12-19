import express from "express";
const consumerRoute = express.Router();



import { AddFavController } from "../controllers/consumer/FavoriteMeal/addFavController";
//import { RemoveFavController } from "../controllers/consumer/FavoriteMeal/removeFavController";
//import { SeeFavController } from "../controllers/consumer/FavoriteMeal/seeFavController";
import { AddMealCartController } from "../controllers/consumer/cart/addMealCartController";


const addFavController = new AddFavController();
//const removeFavController = new RemoveFavController();
//const seeFavController = new SeeFavController();
const addMealCartController= new AddMealCartController();



//adicionar aos favoritos refeição
consumerRoute.post("/:userId/favoriteMeals/:favoriteMealId", addFavController.handle);
//consumerRoute.delete("/:userId/favoriteMeals/:favoriteMealId", removeFavController.handle);
//consumerRoute.get("/:userId/favoriteMeals", seeFavController.handle);
consumerRoute.post("/:mealId", addMealCartController.handle);
