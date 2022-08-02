import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BalanceUI } from '../models/balanceUI';
import { Product } from '../models/product';
import { LocationQuantity } from '../models/locationQuantity';
import { LocationNamePipe } from '../pipes/location-name.pipe';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css'],
})
export class ProductModalComponent implements OnInit {
  product!: Product;
  locationList: LocationQuantity[] = [];
  quantity = 0;
  locationName: string = '';
  filteredLocations: LocationQuantity[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BalanceUI,
    private locationPipe: LocationNamePipe
  ) {
    this.product = data.product;
    this.locationList = data.locationList;
    this.quantity = data.quantity;
  }

  ngOnInit(): void {
    this.filterLocations();
  }

  filterLocations() {
    this.filteredLocations = this.locationPipe.transform(
      this.locationList,
      this.locationName
    );
  }
}
