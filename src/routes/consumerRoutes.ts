import express from "express";
const consumerRouter = express.Router();



import { AddFavController } from "../controllers/consumer/favoriteMeal/addFavController";
//import { RemoveFavController } from "../controllers/consumer/FavoriteMeal/removeFavController";
//import { SeeFavController } from "../controllers/consumer/FavoriteMeal/seeFavController";
import { AddMealCartController } from "../controllers/consumer/cart/addMealCartController";


const addFavController = new AddFavController();
//const removeFavController = new RemoveFavController();
//const seeFavController = new SeeFavController();
const addMealCartController= new AddMealCartController();



//adicionar aos favoritos refeição
consumerRouter.post("/favoriteMeal/:mealId/:uId", addFavController.handle);
//consumerRoute.delete("/:userId/favoriteMeals/:favoriteMealId", removeFavController.handle);
//consumerRoute.get("/:userId/favoriteMeals", seeFavController.handle);
consumerRouter.post("/:mealId", addMealCartController.handle);

export{consumerRouter}
