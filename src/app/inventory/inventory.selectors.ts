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
    inventory.filter((products) => name == products.product.name)
  );

export const getProductByNameAndLocation = (name: string, location: string) =>
  createSelector(getProductByName(name), (products) =>
    products.filter((product) =>
      product.locationList.find(
        (locationQuantity) => location == locationQuantity.location.name
      )
    )
  );

export const selectErrorMessage = createSelector(
  selectInventoryState,
  (inventoryState) => inventoryState.errorMessage
);
