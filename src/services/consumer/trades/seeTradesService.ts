/**
 * @module seeTradesService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";

/**
 * Class responsible for the service that allows you to see the available trades
 */
export class SeeTradesService {

    async execute() {
        const selectTicket = createClient();

        // TODO: filtrar pelo campus e meter nos tests
        // TODO: join com ticket trades para ver se tem troca direta

        const verifyUser = await selectTicket.query('SELECT * from tickets WHERE istrading=$1 AND ispickedup=$2', [true, false])

        const data = verifyUser["rows"]

        return { data, status: 200 }
    }
}