/**
 * @module addFavController
 */
import { Request, Response } from "express";
import { AddFavService } from "../../../services/consumer/favoriteMeal/addFavService";

/**
 * Class responsible for receiving and calling the methods of the service that allows the employee to add a meal to favoritemeal
 */
export class AddFavController {
      /**
     * Allows to add a meal to favorite meal, redirected afterwards to the associated service
     *
     * {@link removeMealService}
     * @param request request receive.
     * @param response response.
     */
    async handle(request: Request, response: Response) {
        const uId = response.locals.uid;
        const mealId=request.params.mealId;

        try {
            if(uId === undefined||
                mealId===undefined) {
                throw new Error("Invalid request");
            }

            const addFavService = new AddFavService();
            const resp = await addFavService.execute({
                uId,
                mealId});

            response.status(resp.status).json(resp.data);
        } catch(e) {
            response.status(500).json(e.message)
        }
    }
}