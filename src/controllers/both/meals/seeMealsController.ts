/**
 * @module seeMealsController
 */

import { Request, Response } from "express";
import { SeeMealsService } from "../../../services/both/meals/seeMealsService";

/**
 * Class responsible for receiving and calling the methods of the service that allows both see meals from bar
 */
export class SeeMealsController {
    async handle(request: Request, response: Response) {
        const barId = request.params.barId;
        const uId = response.locals.uid;
        const role = response.locals.role
        try {
            if (uId === undefined || barId === undefined || role === undefined) {
                throw new Error("Invalid request");
            }

            const seeMealsService = new SeeMealsService();

            const resp = await seeMealsService.execute(barId, uId, role);

            response.status(resp.status).send(resp.data);
        } catch (e) {
            response.status(500).json(e.message)
        }
    }
}