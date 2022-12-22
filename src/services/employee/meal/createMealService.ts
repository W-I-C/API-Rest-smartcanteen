/**
 * @module createMealService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";


export interface ICreateMealService {
    uId:string,
    barId: string;
    name: string;
    preparationTime: number,
    description:string,
    canTakeaway:boolean, 
    price:number,
    allowedChanges:Array<IMealAllowedChange> 
}
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
 * Class responsible for the service that serves to create meals in bar
 */

export class CreateMealService {
   /**
     * Method that allows you to get the details of a meal that the employee from bar can create
     * @param uId authenticated user id
     * @param barId bar where the meal will be inserted
     * @param name meal name
     * @param preparationTime meal preparation time
     * @param description meal description
     * @param canTakeaway information whether or not the meal can be taken away
     * @param price price of meal
     * @param allowchanges array that contains parameters from another table
     * @param ingname name of the ingredient that can be added to the meal
     * @param ingdosage dose that can be added to the meal
     * @param isremoveonly whether it is possible to remove the ingredient
     * @param canbeincremented more ingredient can be added
     * @param canbedecremented can remove more of the ingredient
     * @param incrementlimit limit that can be increased in the ingredient
     * @param decrementlimit limit that can be decremented in the ingredient
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


    }:ICreateMealService) {

        
        const createMeal= createClient();

        const mealExists= createClient();

        //TODO falta verificar se o funcionario está no bar em que quer inserir

        const mealExist=await mealExists.query('SELECT * from Meals WHERE name=$1 AND barId=$2',[name,barId])

        if (mealExist.rowCount > 0) {
            throw new Error('Refeição já existe');
          }
        const createMeals= await createMeal.query('INSERT INTO Meals (name, preparationTime,description,canTakeaway,price,barId) VALUES ($1,$2,$3,$4,$5,$6)', [name,preparationTime,description,canTakeaway,price,barId])
        const selectId= await createMeal.query('SELECT mealId from Meals WHERE name=$1 AND barId=$2', [name,barId])
        
        const mealId=selectId["rows"][0]["mealid"]
        allowedChanges.forEach( async (currentvalue:IMealAllowedChange,index,array)=>{
            

           const allowchanges= await createMeal.query('INSERT INTO allowedchanges (mealId,ingname,ingdosage,isremoveonly,canbeincremented,canbedecremented,incrementlimit,decrementlimit) VALUES($1,$2,$3,$4,$5,$6,$7,$8)', [mealId,currentvalue.ingname,currentvalue.ingdosage,currentvalue.isremoveonly,currentvalue.canbeincremented,currentvalue.canbedecremented,currentvalue.incrementlimit,currentvalue.decrementlimit])
           
        })
        const data="refeição creada com sucesso"
            
        return { data, status: 200 }
    
    }
}