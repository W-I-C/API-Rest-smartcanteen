/**
 * @module editMealService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { checkMealExists, checkMealExistsBar, getEmployeeBar, getMealBar } from "../../../validations/employee/meal/editMealValidation";

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
export interface IEditMealService {
    uId: string,
    mealId: string,
    name: string,
    preparationTime: number,
    description: string,
    canTakeaway: boolean, 
    price: number,
    allowedChanges: Array<IMealAllowedChange>
}

/**
 * @param ingname name of the ingredient
 * @param ingdosage ingredient dosage
 * @param isremoveonly indicates whether it is only possible to remove the ingredient
 * @param canbeincremented indicates whether the ingredient can be increased
 * @param canbedecremented indicates whether the ingredient can be decremented
 * @param incrementlimit possible increment limit
 * @param decrementlimit possible decrementation limit
 */
export interface IMealAllowedChange{
    ingname:string
    ingdosage:string
    isremoveonly:boolean
    canbeincremented:boolean
    canbedecremented:boolean
    incrementlimit:number
    decrementlimit:number
}

/**
 * Class responsible for the service that serves to edit the data of a meal
 */
export class EditMealService {
    /**
     * Method that allows you to edit the data of a meal
     */
    async execute({
        uId,
        mealId,
        name,
        preparationTime,
        description,
        canTakeaway,
        price,
        allowedChanges
    }:IEditMealService) {

        const mealIdExists = await checkMealExists(mealId)
        if(!mealIdExists){
            throw new Error('Meal does not exists')
        }

        // get the bar where the employee works
        const userBarId = await getEmployeeBar(uId);
        const mealBarId = await getMealBar(mealId);

        if(userBarId != mealBarId) {
            throw new Error('Bars are not the same')
        }

        // check if a meal already exists in that bar (they can't be repeated)
        const meal = await checkMealExistsBar(name, userBarId)
        if(meal){
            throw new Error('Meal already exists in this bar')
        }

        const editMealDBClient= createClient();
        const queryUpdate = await editMealDBClient.query(`UPDATE meals
                                                    SET name = $1, preparationTime = $2, description = $3, canTakeAway = $4, price = $5
                                                    WHERE mealid = $6`, [mealId, name, preparationTime, description, canTakeaway, price])

        const removechanges = await editMealDBClient.query(`DELETE FROM allowedchanges 
                                                        WHERE mealid`, [mealId])

        allowedChanges.forEach( async (currentvalue:IMealAllowedChange,index,array)=>{
            const allowchanges= await editMealDBClient.query(`INSERT INTO allowedchanges (mealid,ingname,ingdosage,isremoveonly,canbeincremented,canbedecremented,incrementlimit,decrementlimit) 
                                                            VALUES($1,$2,$3,$4,$5,$6,$7,$8)`, [mealId, currentvalue.ingname, currentvalue.ingdosage, currentvalue.isremoveonly, currentvalue.canbedecremented, currentvalue.canbedecremented, currentvalue.incrementlimit, currentvalue.decrementlimit])
        })

        return { msg: "Meal edited successfully" , status: 200 }
    }
}