/**
 * @module editTicketStateValidation
 */
import { createClient } from "../../../config/db";

/**
 * An employee has access to a list of orders placed by different students that have not yet been delivered. 
 * These tickets have an associated status that can be edited by the employee. For this to be done the bar must be the same as the order bar
 * 
 * @param uId id of the authenticated employee who wants to edit the state of a ticket
 */
export async function getTicketBar(ticketId: string) {
    const checkTicketBarDBClient = createClient();
    const query = await checkTicketBarDBClient.query(`SELECT barid FROM tickets
                                                        WHERE ticketid = $1`, [ticketId]);

    await checkTicketBarDBClient.end()

    return query['rows'][0]["barid"]
}

/**
 * An employee has access to a list of orders placed by different students that have not yet been delivered. 
 * These tickets have an associated status that can be edited by the employee. For this to be done the bar must be the same as the order bar
 * 
 * @param ticketId id of the ticket that we want to know the state
 */
export async function getTicketState(ticketId: string) {
    const getTicketStateDBClient = createClient();
    const query = await getTicketStateDBClient.query(`SELECT stateid FROM tickets
                                                        WHERE ticketid = $1`, [ticketId]);

    await getTicketStateDBClient.end()

    return query['rows'][0]["stateid"]
}

export async function getStateName(stateId: string) {
    const getTicketStateDBClient = createClient();
    const query = await getTicketStateDBClient.query(`SELECT name FROM states
                                                        WHERE stateid = $1`, [stateId]);

    await getTicketStateDBClient.end()

    return query['rows'][0]["name"]
}


/**
 * To change the state of a ticket you need to get the state id
 * 
 * @param stateName name of the state that will be associated to the ticket
 */
export async function getStateId(stateName: string) {
    const getStateIdDBClient = createClient();
    const query = await getStateIdDBClient.query(`SELECT stateid FROM states
                                                WHERE name = $1`, [stateName]);

    await getStateIdDBClient.end()

    return query['rows'][0]["stateid"]
}

/**
 * To change the state of a ticket you need to check if the state exists
 * 
 * @param stateName name of the state that will be associated to the ticket
 */
export async function checkStateNameExists(stateName: string) {
    const checkStateNameDBClient = createClient();
    const query = await checkStateNameDBClient.query(`SELECT stateid FROM states
                                                WHERE name = $1`, [stateName]);

    await checkStateNameDBClient.end()

    return query['rows'].length != 0
}