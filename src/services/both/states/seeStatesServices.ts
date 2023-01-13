
require('dotenv').config();
import { createClient } from "../../../config/db";

export class SeeStatesService {

  async execute(uID: string) {
    const seeMeals = createClient();

    
      const selectStatesResult = await seeMeals.query('SELECT * from states');
      const cart = selectStatesResult["rows"];

      return { data: cart, status: 200 };
    }
}

