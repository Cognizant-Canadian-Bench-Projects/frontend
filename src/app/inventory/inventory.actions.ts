import { createAction,props } from "@ngrx/store";
import { BalanceUI } from "../models/balanceUI";

export const getInventory = createAction(
    "[Getting Inventory] Inventory Page",
    props<{inventory: BalanceUI[]}>()
);