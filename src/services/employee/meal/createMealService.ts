require('dotenv').config();
import { createClient } from "../../../config/db";


export interface ICreateMealService {
    uId:string,
    barId: string;
    name: string;
    preparationTime: number,
    description:string,
    canTakeaway:number, 
    price:number,
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
    }:ICreateMealService) {

        
        const createMeal= createClient();
        const selectmeal = createClient();
        const mealExists= createClient();

        //TODO falta verificar se o funcionario está no bar em que quer inserir

        const mealExist=await mealExists.query('SELECT * from Meals WHERE name=$1',[name])

        if (mealExist.rowCount > 0) {
            throw new Error('Refeição já existe');
          }
        const createMeals= await createMeal.query('INSERT INTO Meals (name, preparationTime,description,canTakeaway,price,barId) VALUES ($1,$2,$3,$4,$5,$6)', [name,preparationTime,description,canTakeaway,price,barId])
         
        
        const meals= await selectmeal.query('SELECT * from Meals')

        

        return { data: {meals}, status: 200 }
        
   
    }
}