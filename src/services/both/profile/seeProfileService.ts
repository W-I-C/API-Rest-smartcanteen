require('dotenv').config();
import { createClient } from "../../../config/db";

export class SeeProfileService {
    async execute(uid: string){
        const client = createClient();

        // todo esta rota é igual para os dois, não faz mal receber informação a mais - falta adicionar o bar
        // todo fazer JOIN para ir à outra tabela buscar o campus preferido
        // todo documentação desta rota e fazer na gateway 
        const query = (await client.query('SELECT name, preferredcampus FROM users WHERE uid = $1', [uid])).rows

        return { data: query, status: 200 }
    }
}