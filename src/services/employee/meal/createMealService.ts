/**
 * @module createMealService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { IMeal } from "../../../models/IMeal";
import { IMealAllowedChange } from "../../../models/IMealAllowedChanges";
import { checkBarExists } from "../../../validations/both/meals/seeMealsValidation";
import { getEmployeeBar } from "../../../validations/employee/meal/editMealValidation";

/**
 * Class responsible for the service that serves to create meals in bar
 */

export class CreateMealService {
   /**
     * Method that allows you to get the details of a meal that the employee from bar can create
     */
    async execute({
        uId,
        barId,
        name,
        preparationTime,
        description,
        canTakeaway,
        price,
        allowedChanges
    }:IMeal) {

        
        const createMealDBClient= createClient();

       
        
        const barExists = await checkBarExists(barId)
        if(!barExists) {
          throw new Error('Bar dont exist');
        }
        
        const userBar = await getEmployeeBar(uId)
        if(userBar != barId) {
          throw new Error('Bars are not the same');
        }

        const mealExist=await createMealDBClient.query('SELECT * from Meals WHERE name=$1 AND barId=$2',[name,barId])

        if (mealExist.rowCount > 0) {
          throw new Error('Meal already exists');
        }

        const createMeals= await createMealDBClient.query('INSERT INTO Meals (name, preparationTime,description,canTakeaway,price,barId) VALUES ($1,$2,$3,$4,$5,$6)', [name,preparationTime,description,canTakeaway,price,barId])
        const selectId= await createMealDBClient.query('SELECT mealId from Meals WHERE name=$1 AND barId=$2', [name,barId])
        
        const mealId=selectId["rows"][0]["mealid"]
        allowedChanges.forEach( async (currentvalue:IMealAllowedChange,index,array)=>{
            

           const allowchanges= await createMealDBClient.query('INSERT INTO allowedchanges (mealId,ingname,ingdosage,isremoveonly,canbeincremented,canbedecremented,incrementlimit,decrementlimit) VALUES($1,$2,$3,$4,$5,$6,$7,$8)', [mealId,currentvalue.ingname,currentvalue.ingdosage,currentvalue.isremoveonly,currentvalue.canbeincremented,currentvalue.canbedecremented,currentvalue.incrementlimit,currentvalue.decrementlimit])
           
        })
        const selectmeal=await createMealDBClient.query('SELECT * from Meals WHERE mealid=$1',[mealId])
        let meal=selectmeal["rows"][0]
        const selectAllowed=await createMealDBClient.query('SELECT changeid,mealid,ingname,ingdosage,isremoveonly,canbeincremented,canbedecremented,incrementlimit,decrementlimit from allowedchanges WHERE mealid=$1',[mealId])
        meal["allowedchanges"]=selectAllowed["rows"]
       
        await createMealDBClient.end()
        
        return { meal, status: 200 }
    
    }
}