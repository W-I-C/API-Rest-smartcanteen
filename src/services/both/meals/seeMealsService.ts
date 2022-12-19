require('dotenv').config();
import { createClient } from "../../../config/db";


export class SeeMealsService {
 
    //esta mal
    async execute( barId:string) {

        
        const fav =createClient();

        const query= await fav.query('SELECT * from Meals WHERE barId=($1)'[barId])

        return { data: {query}, status: 200 }
   
    }
}