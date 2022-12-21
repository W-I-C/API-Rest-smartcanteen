require('dotenv').config();
import { createClient } from "../../../config/db";

export interface IAddFavService {
   
   mealId:string,
   uId:string
}
export class AddFavService {
 
    //esta mal
    async execute( {
        
        mealId,
        uId
    }:IAddFavService) {

        const favMeal= createClient();
        const fav =createClient();
        const query= await favMeal.query('INSERT INTO FavoriteMeals (uId, mealId) VALUES ($1,$2)', [uId,mealId])
        
        const queryFav= await fav.query('SELECT * from FavoriteMeals')

        return { data: {queryFav}, status: 200 }
   
    }
}