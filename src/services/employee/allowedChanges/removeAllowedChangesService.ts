require('dotenv').config();
import { createClient } from "../../../config/db";

export class RemoveAllowedChangesService {

    async execute(uId: string, mealId: string, changeId: string) {
        const RemoveAllowedChangesDBClient = createClient();

        await RemoveAllowedChangesDBClient.query(`DELETE FROM allowedchanges WHERE changeid = $1`, [changeId])


        const query = await RemoveAllowedChangesDBClient.query(`SELECT *
                                            FROM allowedchanges
                                            WHERE mealid = $1`, [mealId])

        const data = query["rows"]


        return { data, status: 200 }

    }
}