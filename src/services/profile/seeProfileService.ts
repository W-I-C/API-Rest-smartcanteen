
require('dotenv').config();
const createClient = require('../../config/db');

export class SeeProfileService {
    async execute(uId: string){
        const client = createClient();
        const query = await client.query('SELECT * FROM users WHERE id = $1', [uId])

        return { data: {query}, status: 200 }
    }
}