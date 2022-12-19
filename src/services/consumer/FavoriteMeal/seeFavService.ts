require('dotenv').config();
import { createClient } from "../../../config/db";

export class SeeFavService {
    async execute(uId: string) {
        const client = createClient();

        const query = (await client.query(`SELECT favoritemeals.uid, meals.name, meals.preparationtime, meals.price, mealimages.url 
                                            FROM favoritemeals 
                                            JOIN meals ON favoritemeals.mealid = meals.mealid 
                                            JOIN mealimages ON meals.mealid = mealimages.mealid 
                                            WHERE favoritemeals.uid = $1`, [uId])).rows
        
        return { data: {query}, status: 200 }
    }
}