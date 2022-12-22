/**
 * @module removeTicketService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { checkTicketExists } from "../../../validations/consumer/ticket/removeTicketValidation";

/**
 * Class responsible for the service that serves to remove one order of the authenticated user
 */
export class RemoveTicketService {
    /**
     * Method that allows the authenticated user to remove a order
     * 
     * @param uId authenticated user id
     * @param ticketId id of the order to be removed from favorites
     */
    async execute(uId: string, ticketId:string) {
        
        const ticketIdExists = await checkTicketExists(ticketId)

        if(!ticketIdExists){
            throw new Error('Order does not exists')
        }

        // TODO: ao remover tenho que remover de todas as tabelas que tenham este ticketid
        const removeTicketDBClient = createClient();
        await removeTicketDBClient.query(`DELETE FROM tickets
                                            WHERE uid = $1 AND ticketid = $2`, [uId, ticketId])

        await removeTicketDBClient.query(`DELETE FROM tickettrade
                                        WHERE ticketid = $1`, [ticketId])
        
        await removeTicketDBClient.query(`DELETE FROM ticketlogs
                                        WHERE ticketid = $1`, [ticketId])
        
        await removeTicketDBClient.query(`DELETE FROM ticketinvoice
                                        WHERE ticketid = $1`, [ticketId])

        return { msg: 'Order removed sucessfuly', status: 200 }
    }
}