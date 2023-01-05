/**
 * @module createMealService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { IMeal } from "../../../models/IMeal";
import { IMealAllowedChange } from "../../../models/IMealAllowedChanges";

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

        
        const createMeal= createClient();

        const mealExists= createClient();

        //TODO falta verificar se o funcionario está no bar em que quer inserir

        const mealExist=await mealExists.query('SELECT * from Meals WHERE name=$1 AND barId=$2',[name,barId])

        if (mealExist.rowCount > 0) {
            throw new Error('Meal already exists');
          }
        const createMeals= await createMeal.query('INSERT INTO Meals (name, preparationTime,description,canTakeaway,price,barId) VALUES ($1,$2,$3,$4,$5,$6)', [name,preparationTime,description,canTakeaway,price,barId])
        const selectId= await createMeal.query('SELECT mealId from Meals WHERE name=$1 AND barId=$2', [name,barId])
        
        const mealId=selectId["rows"][0]["mealid"]
        allowedChanges.forEach( async (currentvalue:IMealAllowedChange,index,array)=>{
            

           const allowchanges= await createMeal.query('INSERT INTO allowedchanges (mealId,ingname,ingdosage,isremoveonly,canbeincremented,canbedecremented,incrementlimit,decrementlimit) VALUES($1,$2,$3,$4,$5,$6,$7,$8)', [mealId,currentvalue.ingname,currentvalue.ingdosage,currentvalue.isremoveonly,currentvalue.canbeincremented,currentvalue.canbedecremented,currentvalue.incrementlimit,currentvalue.decrementlimit])
           
        })
        const selectmeal=await createMeal.query('SELECT * from Meals WHERE mealid=$1',[mealId])
        let meal=selectmeal["rows"][0]
        const selectAllowed=await createMeal.query('SELECT changeid,mealid,ingname,ingdosage,isremoveonly,canbeincremented,canbedecremented,incrementlimit,decrementlimit from allowedchanges WHERE mealid=$1',[mealId])
        meal["allowedchanges"]=selectAllowed["rows"]
       
        
        return { meal, status: 200 }
    
    }
}