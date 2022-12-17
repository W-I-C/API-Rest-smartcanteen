require('dotenv').config();
import { createClient } from "../../../config/db";


export class AddMealCartService {
 
    async execute( mealId:string) {

        const favMeal= createClient();
        const query= await favMeal.query('INSERT INTO CartMeals (mealId) VALUES ($1)', [mealId])
        
        return { data: {query}, status: 200 }
   
    }
}