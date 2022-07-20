import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { InventoryState } from './reducers';

export const selectInventoryState =
  createFeatureSelector<InventoryState>('inventoryState');

export const allProducts = createSelector(
  selectInventoryState,
  (inventoryState) => inventoryState.inventory
);

export const getProductByName = (name: string) =>
  createSelector(allProducts, (inventory) =>
    //inventory.find((products) => name == products.product.name)
    inventory.filter((products) => name == products.product.name)
  );

export const getProductByNameAndLocation = (name: string, location: string) =>
  createSelector(getProductByName(name), (products) =>
    //if (
    // products.locationList.find(
    //   (locationQuantity) => location == locationQuantity.location.name
    // )
    products.filter(
      (product) =>
        product.locationList.find(
          (locationQuantity) => location == locationQuantity.location.name
        )
      // ) {
      //   return product;
      // } else {
      //   return undefined;
      // }
    )
  );
