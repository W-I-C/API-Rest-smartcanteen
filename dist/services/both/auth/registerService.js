"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompleteCartService = void 0;
/**
 * @module removeMealsCartService
 */
require('dotenv').config();
const db_1 = require("../../../config/db");
const dbHelpers_1 = require("../../../helpers/dbHelpers");
/**
 * class responsible for removing a meal from the cart
 */
class CompleteCartService {
    /**
       * Method that allows you to get the details of a meal that the authenticated user has added to favorites
       * @param cart cart information
       * @param ticketAmount ticket amount
       */
    execute({ uId, paymentmethodid, barid, cartId, pickuptime, istakingaway, }, ticketAmount) {
        return __awaiter(this, void 0, void 0, function* () {
            const completeCartDBClient = (0, db_1.createClient)();
            const cartQuery = yield completeCartDBClient.query('SELECT * from cart WHERE cartId=$1 AND uId=$2 AND iscompleted=$3', [cartId, uId, false]);
            if (cartQuery['rows'].length == 0) {
                throw new Error('Cart does not exist!');
            }
            const mealsQuery = yield completeCartDBClient.query(`SELECT * FROM cart
                                                          JOIN cartmeals on cartmeals.cartid = cart.cartid
                                                          LEFT JOIN cartmealschanges ON cartmealschanges.cartmealid=cartmeals.cartmealid
                                                          JOIN meals on meals.mealid = cartmeals.mealid
                                                          WHERE cart.cartid=$1`, [cartId]);
            const meals = mealsQuery['rows'];
            const stateid = yield (0, dbHelpers_1.getNotStartedStatusId)();
            const emissionDate = new Date();
            let totalwtax = 0;
            let total = 0;
            let amountwtax = 0;
            const tax = 0.23;
            const taxa = 23;
            meals.forEach(meal => {
                totalwtax += meal['mealprice'] * tax + meal['mealprice'];
                total += meal['mealprice'];
                amountwtax += meal['mealprice'] * tax;
            });
            const lastEncomendaToday = yield completeCartDBClient.query('SELECT MAX(nencomenda) as lastNEncomenda FROM tickets WHERE tickets.emissiondate = CURRENT_DATE');
            let nencomenda = 0;
            if (lastEncomendaToday['rows'].length == 0) {
                nencomenda = 1;
            }
            else {
                nencomenda = lastEncomendaToday['rows'][0]['lastnencomenda'] + 1;
            }
            yield completeCartDBClient.query(`INSERT INTO tickets(uId,stateid,paymentmethodid,barid,cartId,emissiondate,pickuptime,istakingaway,ticketAmount,total,nencomenda) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`, [uId, stateid, paymentmethodid, barid, cartId, emissionDate, pickuptime, istakingaway, ticketAmount, total, nencomenda]);
            const ticketQuery = yield completeCartDBClient.query('SELECT * FROM tickets WHERE uId=$1 AND stateid=$2 AND paymentmethodid=$3 AND barid=$4 AND cartId=$5 AND emissiondate=$6 AND pickuptime=$7 AND istakingaway=$8 AND ticketAmount=$9 AND total=$10 AND nencomenda=$11', [uId, stateid, paymentmethodid, barid, cartId, emissionDate, pickuptime, istakingaway, ticketAmount, total, nencomenda]);
            const ticketid = ticketQuery['rows'][0]['ticketid'];
            yield completeCartDBClient.query(`INSERT INTO ticketinvoice(ticketid,referuser,total,emissiondate) VALUES($1,$2,$3,$4)`, [ticketid, uId, total, emissionDate]);
            const invoiceQuery = yield completeCartDBClient.query('SELECT * FROM ticketinvoice WHERE ticketid=$1 AND referuser=$2 AND total=$3 AND emissiondate=$4', [ticketid, uId, total, emissionDate]);
            const invoiceId = invoiceQuery['rows'][0]['invoiceid'];
            yield completeCartDBClient.query(`INSERT INTO invoicetaxdetails(invoiceid,tax,baseprice,amountwtax,totalwtax) VALUES($1,$2,$3,$4,$5)`, [invoiceId, taxa, total, amountwtax, totalwtax]);
            meals.forEach((meal) => __awaiter(this, void 0, void 0, function* () {
                const totalmealwtax = meal['mealprice'] * tax + meal['mealprice'];
                yield completeCartDBClient.query(`INSERT INTO invoiceproducts(invoiceid,name,tax,totalwtax) VALUES ($1,$2,$3,$4)`, [invoiceId, meal['name'], taxa, totalmealwtax]);
            }));
            yield completeCartDBClient.query(`UPDATE cart SET iscompleted=$1 WHERE cartid=$2`, [true, cartId]);
            return { status: 200, data: { msg: "Ticket generated successfully" } };
        });
    }
}
exports.CompleteCartService = CompleteCartService;
//# sourceMappingURL=registerService.js.map