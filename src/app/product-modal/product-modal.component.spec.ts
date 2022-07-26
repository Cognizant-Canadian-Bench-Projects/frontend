import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Department } from '../models/department';
import { LocationQuantity } from '../models/locationQuantity';
import { Product } from '../models/product';
import { Location } from '../models/location';
import { BalanceUI } from '../models/balanceUI';

import { ProductModalComponent } from './product-modal.component';

describe('ProductModalComponent', () => {
  let component: ProductModalComponent;
  let fixture: ComponentFixture<ProductModalComponent>;
  let product1: Product;
  let location: Location;
  let locationQuantity: LocationQuantity;
  let locationList: LocationQuantity[];
  let department1: Department;
  let balanceUI: BalanceUI;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductModalComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    department1 = {
      id: 1,
      departmentName: 'clothing',
    };
    product1 = {
      id: 1,
      name: 'shirt',
      department: department1,
    };

    location = {
      id: 1,
      name: 'vaughn',
      zipcode: '1234',
    };

    locationQuantity = {
      location: location,
      quantity: 10,
    };

    locationList = [locationQuantity];

    balanceUI = {
      product: product1,
      locationList: locationList,
      quantity: locationList[0].quantity,
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
