import express from "express";
const consumerRouter = express.Router();
import { validateToken } from "../middlewares/validateToken";
import { validateRefreshToken } from "../middlewares/validateRefreshToken";


import { AddFavController } from "../controllers/consumer/favoriteMeal/addFavController";
import { AddMealCartController } from "../controllers/consumer/cart/addMealCartController";

import { SeeFavController } from "../controllers/consumer/favoriteMeal/seeFavController";
import { RemoveFavController } from "../controllers/consumer/favoriteMeal/removeFavController";
import { SeeMealsCartController } from "../controllers/consumer/cart/seeMealCartController";
import { SeeMealsController } from "../controllers/both/meals/seeMealsController";



const addFavController = new AddFavController();
const removeFavController = new RemoveFavController();
const seeFavController = new SeeFavController();
const addMealCartController= new AddMealCartController();
const seeMealsCartController=new SeeMealsCartController();



//adicionar aos favoritos refeição
consumerRouter.post("/favoriteMeals/:favoriteMealId", validateToken, validateRefreshToken, addFavController.handle);
consumerRouter.delete("/favoriteMeals/:favoriteMealId", validateToken, validateRefreshToken, removeFavController.handle);
consumerRouter.get("/favoriteMeals", validateToken, validateRefreshToken, seeFavController.handle);
consumerRouter.post("/:mealId", addMealCartController.handle);
consumerRouter.get("/cart/meals",validateToken, validateRefreshToken,seeMealsCartController.handle);


export { consumerRouter }
