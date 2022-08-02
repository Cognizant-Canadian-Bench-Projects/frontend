import { EntitySelectorsFactory } from '@ngrx/data';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BalanceUI } from '../models/balanceUI';
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

export const inventorySelectors =
  new EntitySelectorsFactory().create<BalanceUI>('Inventory');

export const selectProductByName = (name: string) =>
  createSelector(inventorySelectors.selectEntities, (inventory) =>
    inventory.filter(
      (balanceUI) => balanceUI.product.name.toUpperCase() == name.toUpperCase()
    )
  );

export const selectProductByNameAndLocation = (
  name: string,
  location: string
) =>
  createSelector(selectProductByName(name), (products) =>
    products.filter((product) =>
      product.locationList.find(
        (locationQuantity) =>
          location.toUpperCase() == locationQuantity.location.name.toUpperCase()
      )
    )
  );
