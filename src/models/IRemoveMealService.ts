/**
 * @param uId authenticated user id
 * @param mealId id of the meal to be removed
 */
export interface IRemoveMealService {
    uId: string,
    mealId: string
}