/**
 * @param ingname name of the ingredient
 * @param ingdosage ingredient dosage
 * @param isremoveonly indicates whether it is only possible to remove the ingredient
 * @param canbeincremented indicates whether the ingredient can be increased
 * @param canbedecremented indicates whether the ingredient can be decremented
 * @param incrementlimit possible increment limit
 * @param decrementlimit possible decrementation limit
 */
export interface IMealAllowedChange{
    ingname:string
    ingdosage:string
    isremoveonly:boolean
    canbeincremented:boolean
    canbedecremented:boolean
    incrementlimit:number
    decrementlimit:number
}