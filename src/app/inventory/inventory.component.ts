import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BalanceUI } from '../models/balanceUI';
import { getInventory } from './inventory.actions';
import { InventoryService } from './inventory.service';
import { InventoryState } from './reducers';
import {tap} from "rxjs/operators";
import { noop, Observable } from 'rxjs';
import { AppState } from '../app.state';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  inventoryForm!: UntypedFormGroup;
  balanceUI!: BalanceUI[];
  @ViewChild('error_message') error_message!: ElementRef;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private inventoryService: InventoryService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
  this.inventoryService.selectInventory().subscribe(
    inventory => this.balanceUI = inventory
  );


    // this.inventoryService.getInventory()
    // .pipe(
    //   tap(inventory => {
    //     this.store.dispatch(getInventory({inventory}));
    //   })
    // ).subscribe(
    //   noop,
    //   (err)=> console.log(err.error)
    // )

    this.inventoryForm = this.formBuilder.group({
      productName: ['', Validators.required],
      locationName: [''],
    });
  }

  onSubmit() {
    // console.log(this.inventoryForm.value.locationName);
    // if (this.inventoryForm.value.locationName == '') {
    //   this.inventoryService
    //     .getProductInventory(this.inventoryForm.value.productName)
    //     .subscribe({
    //       next: (result) => {
    //         this.balanceUI = result;
    //       },
    //       error: (result) => {
    //         this.error_message.nativeElement.innerHTML = result.error;
    //         this.error_message.nativeElement.class = 'alert alert-danger';
    //       },
    //     });
    // } else {
    //   this.inventoryService
    //     .getProductInventoryWithLocation(
    //       this.inventoryForm.value.productName,
    //       this.inventoryForm.value.locationName
    //     )
    //     .subscribe({
    //       next: (result) => {
    //         this.balanceUI = result;
    //       },
    //       error: (result) => {
    //         this.error_message.nativeElement.innerHTML = result.error;
    //         this.error_message.nativeElement.class = 'alert alert-danger';
    //       },
    //     });
    // }
  }
}
