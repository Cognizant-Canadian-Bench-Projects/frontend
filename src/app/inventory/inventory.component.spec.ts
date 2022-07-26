import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { BalanceUI } from '../models/balanceUI';
import { Department } from '../models/department';
import { Location } from '../models/location';
import { LocationQuantity } from '../models/locationQuantity';
import { Product } from '../models/product';

import { InventoryComponent } from './inventory.component';
import { InventoryService } from './inventory.service';

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

let balanceUI: BalanceUI = {
  product: product,
  locationList: [locationQuantity],
  quantity: 4,
};

describe('InventoryComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;
  let dialog = jasmine.createSpyObj('MatDialog', ['open']);
  let inventoryService: InventoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InventoryComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        { provide: MatDialog, useValue: dialog },
        FormBuilder,
        { provide: InventoryService, useClass: MockInventoryServices },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialog = TestBed.inject(MatDialog);
    inventoryService = TestBed.inject(InventoryService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open product modal', () => {
    component.ngOnInit();
    fixture.detectChanges();
    component.openProductModal(balanceUI);
    expect(dialog.open).toHaveBeenCalled();
  });

  it('onSubmit should return result if correct product name', () => {
    component.inventoryForm.value.productName = 'shirt';
    spyOn(inventoryService, 'selectProductByName').and.returnValue(
      of([balanceUI])
    );
    component.onSubmit();
  expect(component.balanceUI[0]).toEqual(balanceUI);
  });

  it('onSubmit should return result if correct product name and location name', () => {
    component.inventoryForm.value.productName = 'shirt';
    component.inventoryForm.value.locationName = 'toronto';
    spyOn(inventoryService, 'selectProductByNameAndLocation').and.returnValue(
      of([balanceUI])
    );
    component.onSubmit();
  expect(component.balanceUI[0]).toEqual(balanceUI);
  });

  it('onSubmit should return result if no product name', () => {
    component.inventoryForm.value.productName = 'shirts';
    spyOn(inventoryService, 'selectProductByName').and.returnValue(
      of([])
    );
    component.onSubmit();
  expect(component.error_message.nativeElement.innerHTML)
  .toEqual(`Product shirts is not in our inventory`);
  });

  it('onSubmit should return result if no product name or location name', () => {
    component.inventoryForm.value.productName = 'shirts';
    component.inventoryForm.value.locationName = 'vaughn';
    spyOn(inventoryService, 'selectProductByNameAndLocation').and.returnValue(
      of([])
    );
    component.onSubmit();
  expect(component.error_message.nativeElement.innerHTML)
  .toEqual(`Product shirts is not in our inventory or Location vaughn is incorrect`);
  });

  it('onInIt should subscribe form selectInventory',()=>{
    spyOn(inventoryService,'selectInventory').and.returnValue (of([balanceUI]))
    component.ngOnInit();
    expect(component.balanceUI).toEqual([balanceUI]);
    expect(component.inventoryForm.value).toEqual({
      productName:'',locationName:''
    })
  })

});
