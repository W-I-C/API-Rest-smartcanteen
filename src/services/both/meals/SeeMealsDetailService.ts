require('dotenv').config();
import { createClient } from "../../../config/db";


export class SeeMealsDetailService {
 
    
    async execute(uId:string) {

        
        const mealsDetail=createClient();
        
        
 
        const query=await mealsDetail.query('SELECT name,preparationTime,description,canTakeAway,price from Meals')
        
    
        const data=query["rows"]
        return { data, status: 200 }
   
        

 
   
    }
}