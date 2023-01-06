/**
 * @module removeFavController
 */
import { Request, Response } from "express";
import { RemoveFavService } from "../../../services/consumer/favoriteMeal/removeFavService";

/**
 * Class responsible for receiving and calling the service methods that allow the user to remove a meal from favorites
 */
export class RemoveFavController {
    /**
   * Allows you to remove a meal from the favorites, redirecting afterwards to the associated service
   *
   * {@link removeFavService}
   * @param request request receive.
   * @param response response.
   */
    async handle(request: Request, response: Response) {
        const uId = response.locals.uid;
        const favMealId = request.params.favoriteMealId;

        try {
            if (uId === undefined || favMealId === undefined) {
                throw new Error("Invalid request");
            }

            const removeFavService = new RemoveFavService();
            const resp = await removeFavService.execute(uId, favMealId);

            response.status(resp.status).json(resp.data);
        } catch (e) {
            response.status(500).json(e.message)
        }
    }
}