require('dotenv').config();
import { createClient } from "../../../config/db";


export class SeeMealsService {
 
    //esta mal
    async execute( barId:string,uId:string) {

        
        const seeMeals =createClient();
        
        
        const query= await seeMeals.query('SELECT * from Meals WHERE barId=($1)',[barId])
        
        
      

        return { data: {query}, status: 200 }
   
    }
}