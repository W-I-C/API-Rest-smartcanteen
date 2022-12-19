require('dotenv').config();
import { createClient } from "../../../config/db";

export class SeeProfileService {
    async execute(uId: string){
        const client = createClient();

        // todo esta rota é igual para os dois, não faz mal receber informação a mais - falta adicionar o bar
        // todo fazer JOIN para ir à outra tabela buscar o campus preferido
        // todo documentação desta rota e fazer na gateway 
        const query = (await client.query(`SELECT users.name, campus.name AS campusName 
                                            FROM users JOIN campus ON users.preferredCampus = campus.campusid 
                                            WHERE users.uid = $1`, [uId])).rows

        return { data: query, status: 200 }
    }
}