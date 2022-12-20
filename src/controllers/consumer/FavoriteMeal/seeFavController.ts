/**
 * @module seeFavController
 */
import { Request, Response } from "express";
import { SeeFavService } from "../../../services/consumer/FavoriteMeal/seeFavService";

/**
 * Class responsible for receiving and calling the service methods that allow the user to see all the meals he has already added to favorites
 */
export class SeeFavController {
    /**
     * Allows to get all meals that the authenticated user has already added to favorites, redirected afterwards to the associated service
     *
     * {@link seeFavService}
     * @param request request receive.
     * @param response response.
     */
    async handle(request: Request, response: Response) {
        const uId = response.locals.uid;
        
        try {
            if(uId === undefined) {
                throw new Error("Invalid request");
            }

            const seeFavService = new SeeFavService();
            const resp = await seeFavService.execute(uId);

            response.status(resp.status).json(resp.data);
        } catch(e) {
            response.status(500).json(e.message)
        }
    }
}