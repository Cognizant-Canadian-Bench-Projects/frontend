import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { BalanceUI } from '../models/balanceUI';
import { getInventory } from './inventory.actions';
import { InventoryService } from './inventory.service';
import { InventoryState } from './reducers';
import { tap } from 'rxjs/operators';
import { noop, Observable } from 'rxjs';
import { AppState } from '../app.state';
import { LocationQuantity } from '../models/locationQuantity';
import { MatDialog } from '@angular/material/dialog';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { InventioryDataService } from './inventiory-data.service';
import {
  getProductByName,
  selectProductByName,
  selectProductByNameAndLocation,
} from './inventory.selectors';
declare var window: any;
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  //inventoryForm!: UntypedFormGroup;
  balanceUI!: BalanceUI[];
  product: BalanceUI | undefined;
  productName: string = '';
  locationName: string = '';

  display = 'none';
  @ViewChild('error_message') error_message!: ElementRef;
  constructor(
    private inventoryDataService: InventioryDataService,
    //private formBuilder: UntypedFormBuilder,
    private inventoryService: InventoryService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.inventoryDataService.entities$.subscribe({
      next: (entities) => {
        this.balanceUI = entities;
      },
    });
    // this.inventoryService
    //   .selectInventory()
    //   .subscribe((inventory) => (this.balanceUI = inventory));

    // this.inventoryForm = this.formBuilder.group({
    //   productName: ['', Validators.required],
    //   locationName: [''],
    // });
  }

  openProductModal(balance: BalanceUI) {
    // console.log(balance);
    this.dialog.open(ProductModalComponent, {
      data: balance,
    });
  }
}
