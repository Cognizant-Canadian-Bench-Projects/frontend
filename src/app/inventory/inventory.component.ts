import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BalanceUI } from '../models/balanceUI';
import { InventoryService } from './inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  inventoryForm!: FormGroup;
  balanceUI!: BalanceUI;
  @ViewChild('error_message') error_message!: ElementRef;
  constructor(
    private formBuilder: FormBuilder,
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {
    this.inventoryForm = this.formBuilder.group({
      productName: ['', Validators.required],
      locationName: [''],
    });
  }

  onSubmit() {
    console.log(this.inventoryForm.value.locationName);
    if (this.inventoryForm.value.locationName == '') {
      this.inventoryService
        .getProductInventory(this.inventoryForm.value.productName)
        .subscribe({
          next: (result) => {
            this.balanceUI = result;
          },
          error: (result) => {
            this.error_message.nativeElement.innerHTML = result.error;
            this.error_message.nativeElement.class = 'alert alert-danger';
          },
        });
    } else {
      this.inventoryService
        .getProductInventoryWithLocation(
          this.inventoryForm.value.productName,
          this.inventoryForm.value.locationName
        )
        .subscribe({
          next: (result) => {
            this.balanceUI = result;
          },
          error: (result) => {
            this.error_message.nativeElement.innerHTML = result.error;
            this.error_message.nativeElement.class = 'alert alert-danger';
          },
        });
    }
  }
}
