import express from "express";
const consumerRoute = express.Router();



import { AddFavController } from "../controllers/consumer/FavoriteMeal/addFavController";


const addFavController = new AddFavController();



//adicionar aos favoritos refeição
consumerRoute.post("/:favoriteMealId", addFavController.handle);