import express from "express";
const consumerRouter = express.Router();
import { validateToken } from "../middlewares/validateToken";
import { validateRefreshToken } from "../middlewares/validateRefreshToken";


import { AddFavController } from "../controllers/consumer/FavoriteMeal/addFavController";
import { RemoveFavController } from "../controllers/consumer/FavoriteMeal/removeFavController";
import { SeeFavController } from "../controllers/consumer/FavoriteMeal/seeFavController";
import { AddMealCartController } from "../controllers/consumer/cart/addMealCartController";


const addFavController = new AddFavController();
const removeFavController = new RemoveFavController();
const seeFavController = new SeeFavController();
const addMealCartController= new AddMealCartController();



//adicionar aos favoritos refeição
consumerRouter.post("/favoriteMeals/:favoriteMealId", validateToken, validateRefreshToken, addFavController.handle);
consumerRouter.delete("/favoriteMeals/:favoriteMealId", validateToken, validateRefreshToken, removeFavController.handle);
consumerRouter.get("/favoriteMeals", validateToken, validateRefreshToken, seeFavController.handle);
consumerRouter.post("/:mealId", addMealCartController.handle);


export { consumerRouter }