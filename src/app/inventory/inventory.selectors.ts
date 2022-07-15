import { createFeatureSelector, createSelector } from "@ngrx/store";
import { InventoryState } from "./reducers";

export const selectInventoryState = createFeatureSelector<InventoryState>("inventoryState")

export const allProducts = createSelector(
    selectInventoryState,
    inventoryState => inventoryState.inventory
)