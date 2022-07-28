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
import { InventioryDataService } from './inventiory-data.service';
import { getProductByName } from './inventory.selectors';
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
    private inventoryDataService: InventioryDataService,
    private formBuilder: UntypedFormBuilder,
    private inventoryService: InventoryService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.inventoryDataService.entities$.subscribe({
      next:entities=>{
        this.balanceUI=entities;
      }
    })
    // this.inventoryService
    //   .selectInventory()
    //   .subscribe((inventory) => (this.balanceUI = inventory));


    this.inventoryForm = this.formBuilder.group({
      productName: ['', Validators.required],
      locationName: [''],
    });
  }

  onSubmit() {
    const formVals = this.inventoryForm.value;
    if (formVals.locationName == '') {
      this.inventoryDataService.entities$.subscribe({
        next:(result)=>{
          this.balanceUI = result.filter(balanceUI=>{
          balanceUI.product.name == formVals.productName;

        })
        }
      })
        // .selectProductByName(formVals.productName)
        // .subscribe({
        //   next: (result) => {
        //     if (result.length == 0) {
        //       this.error_message.nativeElement.innerHTML = `Product ${formVals.productName} is not in our inventory`;
        //       this.error_message.nativeElement.className = 'alert alert-danger';
        //     } else {
        //       this.error_message.nativeElement.innerHTML = '';
        //       this.error_message.nativeElement.className = '';
        //       this.balanceUI = result;
        //     }
        //   },
        //   error: (result) => {
        //     this.error_message.nativeElement.innerHTML = result.error;
        //     this.error_message.nativeElement.class = 'alert alert-danger';
        //   },
        // });
    } else {
      this.inventoryService
        .selectProductByNameAndLocation(
          formVals.productName,
          formVals.locationName
        )
        .subscribe({
          next: ((result) => {
            if (result.length == 0) {
              this.error_message.nativeElement.innerHTML = `Product ${formVals.productName} is not in our inventory or Location ${formVals.locationName} is incorrect`;
              this.error_message.nativeElement.className = 'alert alert-danger';
            console.log("1");
            } else {
              this.error_message.nativeElement.innerHTML = '';
              this.error_message.nativeElement.className = '';
              this.balanceUI = result;
              console.log("2");
            }
          }),
          error: (result) => {
            this.error_message.nativeElement.innerHTML = result.error;
            this.error_message.nativeElement.class = 'alert alert-danger';
            console.log("3");
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
