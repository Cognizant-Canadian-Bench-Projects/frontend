import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of, throwError } from 'rxjs';
import { AppComponent } from './app.component';
import { AppState } from './app.state';
import { InventoryService } from './inventory/inventory.service';
import { InventoryState } from './inventory/reducers';
import { BalanceUI } from './models/balanceUI';
import { Department } from './models/department';
import { Location } from './models/location';
import { LocationQuantity } from './models/locationQuantity';
import { Product } from './models/product';

class MockInventoryServices {
  getProductInventory() {
    return of();
  }
  getProductInventoryWithLocation() {
    return of();
  }
  getInventory() {
    return of();
  }
  selectInventory() {
    return of();
  }
  selectProductByName() {
    return of();
  }
  selectProductByNameAndLocation() {
    return of();
  }
}

let location: Location = {
  id: 1,
  name: 'vaughn',
  zipcode: '1234',
};

let locationQuantity: LocationQuantity = {
  location: location,
  quantity: 10,
};

let department: Department = {
  id: 1,
  departmentName: 'clothing',
};

let product: Product = {
  id: 1,
  name: 'shirt',
  department: department,
};

let product2: Product = {
  id: 1,
  name: 'lower',
  department: department,
};

let balanceUI: BalanceUI = {
  product: product,
  locationList: [locationQuantity],
  quantity: 4,
};

let balanceUI2: BalanceUI = {
  product: product2,
  locationList: [locationQuantity],
  quantity: 4,
};

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore<AppState>;
  let mockSelector: MemoizedSelector<InventoryState, BalanceUI[]>;
  const initialState = { inventoryState: [] };
  let inventoryService: InventoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: InventoryService, useClass: MockInventoryServices },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
    inventoryService = TestBed.inject(InventoryService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should load inventory on ngOninit', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    spyOn(inventoryService, 'getInventory').and.returnValue(of([balanceUI]));
    spyOn(store, 'dispatch').and.callThrough();
    app.ngOnInit();
    expect(store.dispatch).toHaveBeenCalled();
  });

  // it('should load error if  no database connection', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   spyOn(inventoryService, 'getInventory').and.returnValue(throwError(() => new Error('test')));
  //   spyOn(store, 'dispatch').and.callThrough();
  //   app.ngOnInit();
  //   expect(app.error).toEqual("couldnt load inventory");
  // });

  it(`should have as title 'inventory system'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('inventory system');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('inventory system');
  // });

  // it('should load inventory onInit',() => {
  //   fixture.detectChanges();

  // })
});
