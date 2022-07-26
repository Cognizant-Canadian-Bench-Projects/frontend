import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { InventoryService } from './inventory.service';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AppState } from '../app.state';
import { Location } from '../models/location';
import { LocationQuantity } from '../models/locationQuantity';
import { Department } from '../models/department';
import { Product } from '../models/product';
import { BalanceUI } from '../models/balanceUI';
import { allProducts, getProductByName } from './inventory.selectors';
import { of } from 'rxjs';
import { InventoryState } from './reducers';

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

describe('InventoryService', () => {
  let store: MockStore<AppState>;
  let mockSelector: MemoizedSelector<InventoryState, BalanceUI[]>;
  const initialState = { inventoryState: [] };
  let service: InventoryService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule],
      providers: [HttpClientTestingModule, provideMockStore({ initialState })],
    });
    service = TestBed.inject(InventoryService);
    httpTestingController = TestBed.inject(HttpTestingController);
    store = TestBed.inject(MockStore);
    mockSelector = store.overrideSelector(allProducts, [balanceUI, balanceUI2]);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get Inventory from Backend', () => {
    let request: TestRequest;

    service.getInventory().subscribe((result) => {
      expect(result).toBeTruthy();
      expect(result).toEqual([balanceUI]);
    });
    request = httpTestingController.expectOne(
      'http://localhost:8080/inventory'
    );
    expect(request.request.method).toEqual('GET');
    request.flush([balanceUI]);
  });

  it('should select Inventory from Backend for all products', () => {
    service.selectInventory().subscribe((inventory) => {
      expect(inventory).toEqual([balanceUI, balanceUI2]);
    });
  });

  it('should select Inventory from Backend for single product', () => {
    service.selectProductByName('lower').subscribe((inventory) => {
      expect(inventory).toEqual([balanceUI2]);
    });
  });

  it('should select Inventory from Backend for single product and single location', () => {
    service
      .selectProductByNameAndLocation('lower', 'vaughn')
      .subscribe((inventory) => {
        expect(inventory).toEqual([balanceUI2]);
      });
  });
});
