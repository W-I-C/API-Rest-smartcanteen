
/**
 * @module seeMealsCartService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";

/**
 * Class responsible for the service that serves to see a meal at cart
 */
export class SeeMealsCartService {
 
    /**
     * Method that allows you to see a meal at cart
     */
        
    async execute(uId:string) {
  
        const verifyUser=createClient();
        
        
        const verifyUsers=await verifyUser.query('SELECT uId=$1 from Cart',[uId])
        const queryUser=await verifyUser.query('SELECT * from Cart WHERE uId=$1',[uId])
        
       
        if (verifyUsers.rowCount==queryUser.rowCount) {
         
        
        const data=queryUser["rows"]
        return { data, status: 200 }
    }else{
        throw new Error('o user não pertence a este carrinho');
    }

        

 
   
    }
}