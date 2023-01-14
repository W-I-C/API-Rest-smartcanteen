require('dotenv').config();
import { createClient } from "../../../config/db";

export class SeeAllowedChangesService {
 
    async execute(uId: string, mealId: string) {
        const SeeAllowedChangesDBClient = createClient();

        const query = await SeeAllowedChangesDBClient.query(`SELECT *
                                            FROM allowedchanges
                                            WHERE mealid = $1`, [mealId]) 
        
        const data = query["rows"]

        await SeeAllowedChangesDBClient.end()
                                            
        return { data, status: 200 }
    }
}