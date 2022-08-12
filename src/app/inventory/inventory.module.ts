import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductNamePipe } from '../pipes/product-name.pipe';
import { Route, RouterModule, Routes } from '@angular/router';
import { InventoryDataService } from './inventory-data.service';
import { InventoryResolver } from './inventory.resolver';
import {
  EntityDataModuleConfig,
  EntityDataService,
  EntityDefinitionService,
  EntityMetadataMap,
} from '@ngrx/data';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { compareBalanceUI, compareBalanceUIByName } from '../models/balanceUI';
import { LocationNamePipe } from '../pipes/location-name.pipe';
import { GeonameComponent } from '../geoname/geoname.component';
const inventoryRoutes: Routes = [
  {
    path: '',
    component: InventoryComponent,
    resolve: { Inventory: InventoryResolver },
  },
];
const entityMetadata: EntityMetadataMap = {
  BalanceUI: { entityName: 'Inventory', sortComparer: compareBalanceUI },
  Location: {},
};
@NgModule({
  declarations: [
    InventoryComponent,
    ProductNamePipe,
    LocationNamePipe,
    GeonameComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(inventoryRoutes),
  ],
  exports: [InventoryComponent],
  providers: [
    ProductNamePipe,
    LocationNamePipe,
    InventoryDataService,
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
    // Entity Data Service registers service so that defaults are not used by NgRx Data
    //entityDataService.registerService('Inventory', InventioryDataService);
  }
}
