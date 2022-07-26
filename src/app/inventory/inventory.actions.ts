import { createAction,props } from "@ngrx/store";
import { BalanceUI } from "../models/balanceUI";

export const getInventory = createAction(
    "[App Component] Loading Inventory",
    // props<{inventory: BalanceUI[]}>()
);

export const loadedInventory = createAction(
  "[Load Inventory Effects] All Inventory Loaded",
     props<{inventory: BalanceUI[]}>()
);

export const errorLoadingInventory = createAction(
  "[Load Inventory Effects] Inventory not loaded",
  props<{error:string}>()
);
