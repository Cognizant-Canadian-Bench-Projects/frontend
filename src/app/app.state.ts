import { ActionReducer, ActionReducerMap } from "@ngrx/store";
import { inventoryReducer, InventoryState } from "./inventory/reducers";

export interface AppState {
    inventoryState: InventoryState
}

export const reducers: ActionReducerMap<AppState> = {
    inventoryState: inventoryReducer
}