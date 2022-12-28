import { IMealAllowedChange } from "./IMealAllowedChanges";

/**
 * @param uId authenticated user id
 * @param mealId id of the meal to be changed
 * @param barId id of the bar with which the meal will be associated
 * @param name meal name
 * @param preparationTime the time it takes to prepare the meal
 * @param description description of the meal
 * @param canTakeaway indicates whether the meal can be consumed outside the bar or not
 * @param price price of the meal
 * @param allowedChanges array that contains all the possible changes that can be applied to a meal
 */
export interface IMeal {
    uId: string,
    mealId?: string,
    barId?: string,
    name: string,
    preparationTime: number,
    description: string,
    canTakeaway: boolean, 
    price: number,
    allowedChanges: Array<IMealAllowedChange>
}