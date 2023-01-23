import { Request, Response } from "express";
import { AddAllowedChangesService } from "../../../services/employee/allowedChanges/addAllowedChangesService";

export class AddAllowedChangesController {

    async handle(request: Request, response: Response) {
        const uId = response.locals.uid;
        const mealId = request.params.mealId;
        let { ingname, ingdosage, isremoveonly, canbeincremented, canbedecremented, incrementlimit, decrementlimit, defaultvalue } = request.body

        try {
            console.log(uId)
            console.log(mealId)
            console.log(ingname)
            console.log(ingdosage)
            console.log(isremoveonly)
            console.log(canbeincremented)
            console.log(canbedecremented)
            console.log(defaultvalue)

            if (uId === undefined || mealId === undefined || ingname === undefined || ingdosage === undefined || isremoveonly === undefined || defaultvalue === undefined) {
                throw new Error("Invalid request");
            }

            const addAllowedChangesService = new AddAllowedChangesService();
            const resp = await addAllowedChangesService.execute(uId, mealId ,ingname, ingdosage, isremoveonly, canbeincremented, canbedecremented, defaultvalue, incrementlimit, decrementlimit);

            response.status(resp.status).json(resp.data);
        } catch (e) {
            console.log(e.message)
            response.status(500).json(e.message)
        }
    }
}
