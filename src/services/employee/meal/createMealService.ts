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


export class CreateMealService {
 
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
            

           const allowchanges= await createMeal.query('INSERT INTO allowedchanges (mealId,ingname,ingdosage,isremoveonly,canbeincremented,canbedecremented,incrementlimit,decrementlimit) VALUES($1,$2,$3,$4,$5,$6,$7,$8)', [mealId,currentvalue.ingname,currentvalue.ingdosage,currentvalue.isremoveonly,currentvalue.canbedecremented,currentvalue.canbedecremented,currentvalue.incrementlimit,currentvalue.decrementlimit])
           
        })
        const data="refeição creada com sucesso"
            
        return { data, status: 200 }
    
    }
}