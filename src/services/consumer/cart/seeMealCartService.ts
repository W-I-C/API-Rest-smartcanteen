
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

        const queryUser=await verifyUser.query('SELECT * from Cart WHERE uId=$1 AND iscompleted=$2',[uId,false])

        const data=queryUser["rows"]
        return { data, status: 200 }
    }  
}