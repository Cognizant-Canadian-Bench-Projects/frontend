import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BalanceUI } from '../models/balanceUI';
import { Product } from '../models/product';
import { LocationQuantity } from '../models/locationQuantity';
import { LocationNamePipe } from '../pipes/location-name.pipe';
import { GeonameDataService } from '../geoname/geoname-data.service';
import { InventioryDataService } from '../inventory/inventiory-data.service';

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
  zipcode!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private geonameDataService: GeonameDataService,
    private inventoryDataService: InventioryDataService
  ) {
    this.product = data.balance.product;
    this.zipcode = data.zipcode == '' ? false : true;
    if (this.zipcode) {
      this.setLocationDistances(data.balance.locationList);
    } else {
      this.locationList = data.balance.locationList;
    }
    this.quantity = data.balance.quantity;
  }

  ngOnInit(): void {}

  setLocationDistances(locationList: LocationQuantity[]) {
    let lQindex = 0;
    let updatedDistancesForLocations: LocationQuantity[] = [];
    this.geonameDataService.entities$.subscribe({
      next: (locations) => {
        locations.forEach((location) => {
          let updateLocationQuantity = locationList.find(
            (locationQuantity) =>
              location.zipcode == locationQuantity.location.zipcode
          );
          if (updateLocationQuantity) {
            let locationQuantity: LocationQuantity = {
              location,
              quantity: updateLocationQuantity.quantity,
            };
            updatedDistancesForLocations[lQindex] = locationQuantity;
            lQindex++;
          }
        });
        let balance: BalanceUI = {
          id: this.data.balance.id,
          product: this.data.balance.product,
          locationList: updatedDistancesForLocations,
          quantity: this.data.balance.quantity,
        };
        this.inventoryDataService.updateOneInCache(balance);
        this.locationList = updatedDistancesForLocations;
      },
      error: (err) => console.log(err),
    });
  }
}
