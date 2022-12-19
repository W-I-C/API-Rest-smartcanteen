require('dotenv').config();
import { createClient } from "../../../config/db";

export class RemoveFavService {
    async execute(uId: string, favMealId:string) {

        const client= createClient();
        const query = (await client.query(`DELETE FROM favoritemeals 
                                            WHERE uid = $1 AND mealid`, [uId, favMealId])).rows
        
        return { data: {query}, status: 200 }
    }
}