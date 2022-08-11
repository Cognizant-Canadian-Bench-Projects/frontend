import { Injectable } from '@angular/core';
import {
  EntityActionOptions,
  EntityCollectionReducerFactory,
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Observable } from 'rxjs';
import { BalanceUI } from '../models/balanceUI';

@Injectable({
  providedIn: 'root',
})
export class InventoryDataService extends EntityCollectionServiceBase<BalanceUI> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Inventory', serviceElementsFactory);
  }
}
