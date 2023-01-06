
/**
 * @module removeMealsCartService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { getNotStartedStatusId } from "../../../helpers/dbHelpers";
import { ICart } from "../../../models/ICart";

/**
 * class responsible for removing a meal from the cart
 */
export class CompleteCartService {
  /**
     * Method that allows you to get the details of a meal that the authenticated user has added to favorites
     * @param cart cart information
     * @param ticketAmount ticket amount
     */
  async execute({
    uId,
    paymentmethodid,
    barid,
    cartId,
    pickuptime,
    istakingaway,
  }: ICart, ticketAmount: number) {


    const completeCartDBClient = createClient();
    const cartQuery = await completeCartDBClient.query('SELECT * from cart WHERE cartId=$1 AND uId=$2 AND iscompleted=$3', [cartId, uId, false])

    if (cartQuery['rows'].length == 0) {
      throw new Error('Cart does not exist!')
    }

    const mealsQuery = await completeCartDBClient.query(`SELECT * FROM cart
                                                          JOIN cartmeals on cartmeals.cartid = cart.cartid
                                                          LEFT JOIN cartmealschanges ON cartmealschanges.cartmealid=cartmeals.cartmealid
                                                          JOIN meals on meals.mealid = cartmeals.mealid
                                                          WHERE cart.cartid=$1`, [cartId])

    const meals = mealsQuery['rows']
    const stateid = await getNotStartedStatusId();
    const emissionDate = new Date();
    let totalwtax = 0;
    let total = 0;
    let amountwtax = 0;
    const tax = 0.23
    const taxa = 23

    meals.forEach(meal => {
      totalwtax += meal['mealprice'] * tax + meal['mealprice']
      total += meal['mealprice']
      amountwtax += meal['mealprice'] * tax
    })


    const lastEncomendaToday = await completeCartDBClient.query('SELECT MAX(nencomenda) as lastNEncomenda FROM tickets WHERE tickets.emissiondate = CURRENT_DATE')
    let nencomenda = 0;

    if (lastEncomendaToday['rows'].length == 0) {
      nencomenda = 1;
    } else {
      nencomenda = lastEncomendaToday['rows'][0]['lastnencomenda'] + 1;
    }


    await completeCartDBClient.query(`INSERT INTO tickets(uId,stateid,paymentmethodid,barid,cartId,emissiondate,pickuptime,istakingaway,ticketAmount,total,nencomenda) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`, [uId, stateid, paymentmethodid, barid, cartId, emissionDate, pickuptime, istakingaway, ticketAmount, total, nencomenda])


    const ticketQuery = await completeCartDBClient.query('SELECT * FROM tickets WHERE uId=$1 AND stateid=$2 AND paymentmethodid=$3 AND barid=$4 AND cartId=$5 AND emissiondate=$6 AND pickuptime=$7 AND istakingaway=$8 AND ticketAmount=$9 AND total=$10 AND nencomenda=$11', [uId, stateid, paymentmethodid, barid, cartId, emissionDate, pickuptime, istakingaway, ticketAmount, total, nencomenda])
    const ticketid = ticketQuery['rows'][0]['ticketid']


    await completeCartDBClient.query(`INSERT INTO ticketinvoice(ticketid,referuser,total,emissiondate) VALUES($1,$2,$3,$4)`, [ticketid, uId, total, emissionDate])

    const invoiceQuery = await completeCartDBClient.query('SELECT * FROM ticketinvoice WHERE ticketid=$1 AND referuser=$2 AND total=$3 AND emissiondate=$4', [ticketid, uId, total, emissionDate])
    const invoiceId = invoiceQuery['rows'][0]['invoiceid']
    await completeCartDBClient.query(`INSERT INTO invoicetaxdetails(invoiceid,tax,baseprice,amountwtax,totalwtax) VALUES($1,$2,$3,$4,$5)`, [invoiceId, taxa, total, amountwtax, totalwtax])

    meals.forEach(async meal => {
      const totalmealwtax = meal['mealprice'] * tax + meal['mealprice']

      await completeCartDBClient.query(`INSERT INTO invoiceproducts(invoiceid,name,tax,totalwtax) VALUES ($1,$2,$3,$4)`, [invoiceId, meal['name'], taxa, totalmealwtax])
    })
    await completeCartDBClient.query(`UPDATE cart SET iscompleted=$1 WHERE cartid=$2`, [true, cartId])
    return { status: 200, data: { msg: "Ticket generated successfully" } }
  }
}