/**
 * @module seeOneFavController
 */
import { Request, Response } from "express";
import { SeeOneFavService } from "../../../services/consumer/favoriteMeal/seeOneFavService";

/**
 * Class responsible for receiving and calling the service methods that allow the user to see the details of a meal he has already added to favorites
 */
export class SeeOneFavController {
    /**
     * Allows to get a meal that the authenticated user has already added to favorites, redirected afterwards to the associated service
     *
     * {@link seeOneFavService}
     * @param request request receive.
     * @param response response.
     */
    async handle(request: Request, response: Response) {
        const uId = response.locals.uid;
        const favMealId = request.params.favoriteMealId
        
        try {
            if(uId === undefined || favMealId == undefined) {
                throw new Error("Invalid request");
            }

            const seeOneFavService = new SeeOneFavService();
            const resp = await seeOneFavService.execute(uId, favMealId);

            response.status(resp.status).json(resp.data);
        } catch(e) {
            response.status(500).json(e.message)
        }
    }
}