import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory.component';
import { FormsModule } from '@angular/forms';
import { ProductNamePipe } from '../pipes/product-name.pipe';
import { Route, RouterModule, Routes } from '@angular/router';
import { InventioryDataService } from './inventiory-data.service';
import { InventoryResolver } from './inventory.resolver';
import {
  EntityDataService,
  EntityDefinitionService,
  EntityMetadataMap,
} from '@ngrx/data';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { compareBalanceUI } from '../models/balanceUI';
import { LocationNamePipe } from '../pipes/location-name.pipe';
const inventoryRoutes: Routes = [
  {
    path: '',
    component: InventoryComponent,
    resolve: { Inventory: InventoryResolver },
  },
];
const entityMetadata: EntityMetadataMap = {
  BalanceUI: { entityName: 'Inventory', sortComparer: compareBalanceUI },
};
@NgModule({
  declarations: [InventoryComponent, ProductNamePipe, LocationNamePipe],
  imports: [CommonModule, FormsModule, RouterModule.forChild(inventoryRoutes)],
  exports: [InventoryComponent],
  providers: [
    ProductNamePipe,
    LocationNamePipe,
    InventioryDataService,
    InventoryResolver,
  ],
})
export class InventoryModule {
  constructor(
    eds: EntityDefinitionService
    //entityDataService: EntityDataService,
    //InventioryDataService: InventioryDataService
  ) {
    eds.registerMetadataMap(entityMetadata);
    //entityDataService.registerService('Inventory', InventioryDataService);
  }
}
