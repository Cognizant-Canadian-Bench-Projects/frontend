import { createAction,props } from "@ngrx/store";
import { BalanceUI } from "../models/balanceUI";

export const getInventory = createAction(
    "[App Component] Loading Inventory",
    props<{inventory: BalanceUI[]}>()
);