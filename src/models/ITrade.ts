/**
 * @param uId authenticated user id (the user who will receive the exchange)
 * @param ticketId id of the ticket to accept/refuse the exchange
 * @param receptorDecision decision of the receiver, whether or not to accept the exchange
 */
export interface IAcceptTradeService {
    uId: string,
    ticketId: string,
    receptorDecision: number
}