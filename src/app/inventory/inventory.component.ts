import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { BalanceUI } from '../models/balanceUI';
import { first, tap } from 'rxjs/operators';
import { noop, Observable } from 'rxjs';
import { LocationQuantity } from '../models/locationQuantity';
import { MatDialog } from '@angular/material/dialog';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { InventioryDataService } from './inventiory-data.service';

import { ProductNamePipe } from '../pipes/product-name.pipe';
import { LocationNamePipe } from '../pipes/location-name.pipe';
declare var window: any;
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  balanceUI: BalanceUI[] = [];
  product: BalanceUI | undefined;
  productName: string = '';
  locationName: string = '';
  filteredProducts: BalanceUI[] = [];

  display = 'none';
  @ViewChild('error_message') error_message!: ElementRef;
  constructor(
    private inventoryDataService: InventioryDataService,
    private dialog: MatDialog,
    private productPipe: ProductNamePipe,
    private locationPipe: LocationNamePipe
  ) {}

  ngOnInit(): void {
    console.log(this.inventoryDataService.loaded$);
    this.inventoryDataService.entities$.subscribe({
      next: (inventory) => {
        this.balanceUI = inventory;
      },
    });
    this.filterProducts();
    this.filterByLocation();
  }

  openProductModal(balance: BalanceUI) {
    this.dialog.open(ProductModalComponent, {
      data: balance,
    });
  }

  filterProducts() {
    this.filteredProducts = this.productPipe.transform(
      this.balanceUI,
      this.productName
    );
  }

  filterByLocation() {
    this.filteredProducts = this.locationPipe.transform(
      this.balanceUI,
      this.locationName
    );
  }
}
