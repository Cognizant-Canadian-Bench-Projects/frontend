import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of } from 'rxjs';
import { InventoryActions } from './action-types';
import { InventoryService } from './inventory.service';

@Injectable()
export class InventoryEffect {
  constructor(
    private actions$: Actions,
    private inventoryService: InventoryService
  ) {}

  getInventory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InventoryActions.getInventory),
      concatMap(() =>
        this.inventoryService.getInventory().pipe(
          map((inventory) => {
            return InventoryActions.loadedInventory({ inventory });
          }),
          catchError((err) => {
            return of(
              InventoryActions.errorLoadingInventory({ error: err.error })
            );
          })
        )
      )
    )
  );
}
