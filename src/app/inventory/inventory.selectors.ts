import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InventoryState } from './reducers';

export const selectInventoryState =
  createFeatureSelector<InventoryState>('inventoryState');

export const allProducts = createSelector(
  selectInventoryState,
  (inventoryState) => inventoryState.inventory
);

export const getProductByName = (name: string) =>
  createSelector(allProducts, (inventory) =>
    inventory.find((products) => name == products.product.name)
  );
