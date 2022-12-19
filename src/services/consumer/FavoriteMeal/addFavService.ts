require('dotenv').config();
import { createClient } from "../../../config/db";
export class AddFavService {
 
    //esta mal
    async execute( favoriteMealId:string) {

        const favMeal= createClient();
        const fav =createClient();
        const query= await favMeal.query('INSERT INTO FavoriteMealsChanges (favoriteMealId) VALUES ($1)', [favoriteMealId])
        
        const queryFav= await fav.query('SELECT * from FavoriteMealsChanges')
        return { data: {queryFav}, status: 200 }
   
    }
}