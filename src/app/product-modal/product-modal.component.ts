import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BalanceUI } from '../models/balanceUI';
import { Product } from '../models/inventory';
import { LocationQuantity } from '../models/locationQuantity';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent implements OnInit {

  product!: Product;
  locationList: LocationQuantity[] = [];
  quantity = 0;


  constructor(@Inject(MAT_DIALOG_DATA) public data: BalanceUI) { 
    this.product = data.product;
    this.locationList = data.locationList;
    this.quantity = data.quantity;
  }

  ngOnInit(): void {
  }

}
