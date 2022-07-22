import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
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
declare var window: any;
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  inventoryForm!: UntypedFormGroup;
  balanceUI!: BalanceUI[];
  product: BalanceUI | undefined;

  display = 'none';
  @ViewChild('error_message') error_message!: ElementRef;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private inventoryService: InventoryService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.inventoryService
      .selectInventory()
      .subscribe((inventory) => (this.balanceUI = inventory));

    this.inventoryForm = this.formBuilder.group({
      productName: ['', Validators.required],
      locationName: [''],
    });
  }

  onSubmit() {
    const formVals = this.inventoryForm.value;
    if (formVals.locationName == '') {
      this.inventoryService
        .selectProductByName(formVals.productName)
        .subscribe({
          next: (result) => {
            if (result.length == 0) {
              this.error_message.nativeElement.innerHTML = `Product ${formVals.productName} is not in our inventory`;
              this.error_message.nativeElement.className = 'alert alert-danger';
            } else {
              this.error_message.nativeElement.innerHTML = '';
              this.error_message.nativeElement.className = '';
              this.balanceUI = result;
            }
          },
          error: (result) => {
            this.error_message.nativeElement.innerHTML = result.error;
            this.error_message.nativeElement.class = 'alert alert-danger';
          },
        });
    } else {
      this.inventoryService
        .selectProductByNameAndLocation(
          formVals.productName,
          formVals.locationName
        )
        .pipe(
          tap((result) => {
            if (result.length == 0) {
              this.error_message.nativeElement.innerHTML = `Product ${formVals.productName} is not in our inventory or Location ${formVals.locationName} is incorrect`;
              this.error_message.nativeElement.className = 'alert alert-danger';
            } else {
              this.error_message.nativeElement.innerHTML = '';
              this.error_message.nativeElement.className = '';
              this.balanceUI = result;
            }
          })
        )
        .subscribe({
          next: noop,
          error: (result) => {
            this.error_message.nativeElement.innerHTML = result.error;
            this.error_message.nativeElement.class = 'alert alert-danger';
          },
        });
    }
  }

  openProductModal(balance: BalanceUI) {
    // console.log(balance);
    this.dialog.open(ProductModalComponent, {
      data: balance,
    });
  }
}
