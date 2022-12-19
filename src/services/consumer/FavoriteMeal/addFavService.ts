require('dotenv').config();
import { createClient } from "../../../config/db";
export class AddFavService {
    async execute( favoriteMealId:string) {

        const favMeal= createClient();
        const query= await favMeal.query('INSERT INTO FavoriteMealsChanges (favoriteMealId) VALUES ($1)', [favoriteMealId])
        
        return { data: {query}, status: 200 }
    }
}