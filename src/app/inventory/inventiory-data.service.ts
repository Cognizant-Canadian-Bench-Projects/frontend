import { Injectable } from '@angular/core';
import { EntityCollectionReducerFactory, EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { BalanceUI } from '../models/balanceUI';

@Injectable({
  providedIn: 'root'
})

export class InventioryDataService extends EntityCollectionServiceBase<BalanceUI> {

  constructor(serviceElementsFactory:EntityCollectionServiceElementsFactory) {
    super('Inventory', serviceElementsFactory);
   }
}
