/**
 * @module seeTicketsHistoryService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { getUserCampus } from "../../../validations/consumer/trades/seeTradesValidation";

/**
 * Class responsible for the service that serves to retrieve all the orders that the authenticated user has already placed
 */
export class SeeTicketsHistoryService {
    /**
     * Method that allows you to retrieve all orders placed by the authenticated user
     * @param uId authenticated user id
     */
    async execute(uId: string) {
        const seeTicketsHistoryDBClient = createClient();

        const campusId = await getUserCampus(uId)
        const query = await seeTicketsHistoryDBClient.query(`SELECT bar.name as barname,tickets.ticketid,users.name as ownername,states.name as statename,tickets.cartid,tickets.emissiondate,tickets.pickuptime,tickets.ticketamount, tickets.total,tickets.nencomenda, tickets.isfree
                                                                FROM campus
                                                                JOIN bar on bar.campusid = campus.campusid
                                                                JOIN tickets on tickets.barid = bar.barid
                                                                JOIN users on users.uid = tickets.uid
                                                                JOIN states ON tickets.stateid = states.stateid
                                                                WHERE campus.campusid=$1 AND tickets.uid = $2 AND tickets.isdeleted = $3`, [campusId, uId, false])

        let allData = query["rows"]


        for (let i = 0; i < allData.length; i++) {
            const getmeals = await seeTicketsHistoryDBClient.query(`SELECT cartmeals.mealid,cartmeals.amount,mealprice, meals.name, description, canTakeAway, cartmeals.cartmealid FROM cartmeals
                                                                    LEFT JOIN mealimages ON mealimages.mealid = cartmeals.mealid
                                                                    JOIN meals ON meals.mealid = cartmeals.mealid
                                                                    WHERE cartmeals.cartid = $1`, [allData[i]['cartid']])

            allData[i]['ticketmeals'] = getmeals['rows']

            for (let j = 0; j < allData[i]['ticketmeals'].length; j++) {
                const mealid = allData[i]['ticketmeals'][j]["mealid"];

                const changes = await seeTicketsHistoryDBClient.query(`SELECT allowedchanges.ingname,cartmealschanges.amount as ingamount,allowedchanges.isremoveonly,
                                                                        allowedchanges.canbeincremented, allowedchanges.canbedecremented from cartmeals, cartmeals.cartmealid, cartmealchangeid
                                                                        JOIN meals ON meals.mealid = cartmeals.mealid
                                                                        JOIN cartmealschanges ON cartmealschanges.cartmealid = cartmeals.cartmealid
                                                                        JOIN allowedchanges ON allowedchanges.changeid = cartmealschanges.changeid
                                                                        WHERE cartid=$1 AND meals.mealid = $2`, [allData[i]['cartid'], mealid])

                allData[i]['ticketmeals'][j]['mealchanges'] = changes["rows"];
            }
        }



        await seeTicketsHistoryDBClient.end()

        return { data: allData, status: 200 }
    }
}