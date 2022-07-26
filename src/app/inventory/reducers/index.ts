import { createReducer, on } from '@ngrx/store';
import { BalanceUI } from 'src/app/models/balanceUI';
import { InventoryActions } from '../action-types';

export interface InventoryState {
  inventory: BalanceUI[];
  errorMessage: string | null;
}

export const initialInventoryState: InventoryState = {
  inventory: [],
  errorMessage: null,
};

export const inventoryReducer = createReducer(
  initialInventoryState,

  on(InventoryActions.loadedInventory, (state, action) => {
    return {
      inventory: action.inventory,
      errorMessage: null,
    };
  }),
  on(InventoryActions.errorLoadingInventory, (state, {error}) => {
    return {
      // inventory: action.inventory,
      ...state,
      errorMessage: error,
    };
  }),
);


