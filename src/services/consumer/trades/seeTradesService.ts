/**
 * @module seeTradesService
 */
import { createClient } from "../../../config/db";
import { getUserCampus } from "../../../validations/consumer/trades/seeTradesValidation";

/**
 * Class responsible for the service that allows you to see the available trades
 */
export class SeeTradesService {
    /**
    * Method that allows to see all the tickets that are available to trade in the campus of the user
    * @param uId authenticated user id
    */
    async execute(uId: string) {
        const selectTicket = createClient();

        const campusId = await getUserCampus(uId)
        let allData = []

        const verifyUser = await selectTicket.query(`SELECT tickets.ticketid, tickets.cartid, tickets.barid, tickets.emissiondate, tickets.pickuptime, tickets.isfree, tickets.nencomenda, tickets.ticketamount, tickets.total, NULL AS receptordecision, paymentmethods.name AS paymentmethod,  states.name AS statename, ticketowner.name AS ownername, tradereceiver.name AS receivername, true AS isgeneraltrade, generaltrades.generaltradeid
                                                FROM generaltrades 
                                                JOIN tickets ON generaltrades.ticketid = tickets.ticketid
                                                JOIN bar ON bar.barid = tickets.barid
                                                JOIN campus ON campus.campusid = bar.campusid
                                                JOIN states ON tickets.stateid = states.stateid
                                                JOIN users ticketowner ON tickets.uid = ticketowner.uid
                                                LEFT JOIN users tradereceiver ON generaltrades.uid = tradereceiver.uid
                                                LEFT JOIN paymentmethods ON generaltrades.paymentmethodid = paymentmethods.methodid
                                                WHERE previousowner <> $1 AND campus.campusid = $2 AND Date(tickets.emissiondate) = CURRENT_DATE
                                                AND generaltrades.isdeleted = $3 AND generaltrades.uid is NULL AND generaltrades.tradedate is NULL`, [uId, campusId, false])

        allData = verifyUser["rows"]


        for (let i = 0; i < allData.length; i++) {
            const getmeals = await selectTicket.query(`SELECT cartmeals.mealid,cartmeals.amount,mealprice, meals.name, description, canTakeAway, mealimages.url FROM cartmeals
                                                        LEFT JOIN mealimages ON mealimages.mealid = cartmeals.mealid
                                                        JOIN meals ON meals.mealid = cartmeals.mealid
                                                        WHERE cartmeals.cartid = $1`, [allData[i]['cartid']])

            allData[i]['ticketmeals'] = getmeals['rows']

            for (let j = 0; j < allData[i]['ticketmeals'].length; j++) {
                const mealid = allData[i]['ticketmeals'][j]["mealid"];

                const changes = await selectTicket.query(`SELECT allowedchanges.ingname,cartmealschanges.amount as ingamount,allowedchanges.isremoveonly,
                                                        allowedchanges.canbeincremented, allowedchanges.canbedecremented from cartmeals 
                                                      JOIN meals ON meals.mealid = cartmeals.mealid
                                                      JOIN cartmealschanges ON cartmealschanges.cartmealid = cartmeals.cartmealid
                                                      JOIN allowedchanges ON allowedchanges.changeid = cartmealschanges.changeid
                                                      WHERE cartid=$1 AND meals.mealid = $2`, [allData[i]['cartid'], mealid])

                allData[i]['ticketmeals'][j]['mealchanges'] = changes["rows"];
            }
        }






        await selectTicket.end()

        const data = allData

        return { data, status: 200 }
    }
}
