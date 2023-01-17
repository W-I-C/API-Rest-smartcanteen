require('dotenv').config();
import { createClient } from "../../../config/db";

export class AddAllowedChangesService {
 
    async execute(uId: String, mealId: String ,ingname: String, ingdosage: String, isremoveonly: Boolean, canbeincremented: Boolean, canbedecremented: Boolean, defaultvalue: Number, incrementlimit?: Number, decrementlimit?: Number) {
        const AddAllowedChangesDBClient = createClient();

        const nameExists = await AddAllowedChangesDBClient.query(`SELECT *
                                            FROM allowedchanges
                                            WHERE mealid = $1 AND ingname = $2`, [mealId,ingname])

        if(nameExists["rows"].length == 1){
            throw new Error("This ingredient already exists")
        }

        const remove = await AddAllowedChangesDBClient.query(`INSERT INTO allowedchanges (mealid, ingname,ingdosage,isremoveonly,canbeincremented,canbedecremented,incrementlimit,decrementlimit,defaultvalue) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`, [mealId,ingname,ingdosage,isremoveonly,canbeincremented,canbedecremented,incrementlimit,decrementlimit,defaultvalue]) 
        
        console.log("123")
        const query = await AddAllowedChangesDBClient.query(`SELECT *
                                            FROM allowedchanges
                                            WHERE mealid = $1`, [mealId]) 
        
        const data = query["rows"]

                                            
        return { data, status: 200 }
                                            
    }
}