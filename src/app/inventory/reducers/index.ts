import { createReducer, on } from "@ngrx/store";
import { BalanceUI } from "src/app/models/balanceUI";
import { InventoryActions } from "../action-types";

export interface InventoryState{
    inventory: BalanceUI[]
}

export const initialInventoryState: InventoryState = {
    inventory: []
};

export const inventoryReducer = createReducer(
    initialInventoryState,
    
    on(InventoryActions.getInventory, (state, action) => {
        return {
            inventory: action.inventory
        }
    })
)