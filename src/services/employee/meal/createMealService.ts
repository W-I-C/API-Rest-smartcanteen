require('dotenv').config();
import { createClient } from "../../../config/db";

export interface ICreateMealService {
   
    barId: string;
    name: string;
    preparationTime: number,
    description:string,
    canTakeaway:number, 
    price:number,
}


export class CreateMealService {
 
    async execute({
        
        barId,
        name,
        preparationTime,
        description,
        canTakeaway,
        price,
    }:ICreateMealService) {

        const createMeal= createClient();
        const selectmeal = createClient();
        const query= await createMeal.query('INSERT INTO Meals (name, preparationTime,description,canTakeaway,price,barId) VALUES ($1,$2,$3,$4,$5,$6)', [name,preparationTime,description,canTakeaway,price,barId])
        
        const meals= await selectmeal.query('SELECT * from Meals')



        return { data: {meals}, status: 200 }
   
    }
}