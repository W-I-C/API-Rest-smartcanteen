import { IMeal } from "./IMeal";


/**
 * @param uId authenticated user id
 * @param paymentmethodid id of the payment method
 * @param barid id of the bar
 * @param cartid id of the cart
 * @param pickuptime date and time of pickup
 * @param istakingaway if is take away
 */
export interface ICart {
  uId: string,
  paymentmethodid: string,
  barid: string,
  cartId: string,
  pickuptime: string,
  istakingaway: string,
}