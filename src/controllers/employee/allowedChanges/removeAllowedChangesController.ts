import { Request, Response } from "express";
import { RemoveAllowedChangesService } from "../../../services/employee/allowedChanges/removeAllowedChangesService";

export class RemoveAllowedChangesController {

    async handle(request: Request, response: Response) {
        const uId = response.locals.uid;
        const mealId = request.params.mealId;
        const changeId = request.params.changeId;

        try {
            if (uId === undefined || changeId == undefined) {
                throw new Error("Invalid request");
            }

            const removeAllowedChangesService = new RemoveAllowedChangesService();
            const resp = await removeAllowedChangesService.execute(uId, mealId,changeId);

            response.status(resp.status).json(resp.data);
        } catch (e) {
            response.status(500).json(e.message)
        }
    }
}