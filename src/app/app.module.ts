import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InventoryComponent } from './inventory/inventory.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MatDialogModule } from '@angular/material/dialog';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { reducers } from './app.state';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InventoryEffect } from './inventory/inventory.effects';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import {
  DefaultDataService,
  DefaultDataServiceConfig,
  EntityDataModule,
} from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { timeout } from 'rxjs';
import { ProductNamePipe } from './pipes/product-name.pipe';
import { LocationNamePipe } from './pipes/location-name.pipe';
import { InventoryResolver } from './inventory/inventory.resolver';
import { InventoryModule } from './inventory/inventory.module';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'http://localhost:8080',
  // timeout: 3000,
};

@NgModule({
  declarations: [
    AppComponent,
    ProductModalComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    LocationNamePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    InventoryModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([InventoryEffect]),
    StoreRouterConnectingModule.forRoot(),
    MatDialogModule,
    BrowserAnimationsModule,
    EntityDataModule.forRoot(entityConfig),
  ],
  providers: [
    Store,
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
    LocationNamePipe,
    InventoryResolver,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
