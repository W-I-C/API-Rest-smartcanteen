require('dotenv').config();
import { createClient } from "../../../config/db";

export class AddAllowedChangesService {
 
    async execute(uId: String, mealId: String ,ingname: String, ingdosage: String, isremoveonly: Boolean, canbeincremented: Boolean, canbedecremented: Boolean, incrementlimit: Number, decrementlimit: Number) {
        const AddAllowedChangesDBClient = createClient();

        const remove = await AddAllowedChangesDBClient.query(`INSERT INTO allowedchanges (mealid, ingname,ingdosage,isremoveonly,canbeincremented,canbedecremented,incrementlimit,decrementlimit) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`, [mealId,ingname,ingdosage,isremoveonly,canbeincremented,canbedecremented,incrementlimit,decrementlimit]) 
        

        const query = await AddAllowedChangesDBClient.query(`SELECT *
                                            FROM allowedchanges
                                            WHERE mealid = $1`, [mealId]) 
        
        const data = query["rows"]

                                            
        return { data, status: 200 }
                                            
    }
}