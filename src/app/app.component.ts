import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { InventoryService } from './inventory/inventory.service';
import { tap } from 'rxjs/operators';
import { noop, Observable } from 'rxjs';
import { getInventory } from './inventory/inventory.actions';
import { InventioryDataService } from './inventory/inventiory-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'inventory system';
  error!: string | null;

  constructor(
    private inventoryDataService: InventioryDataService
    // private store: Store<AppState>,
    // private inventoryService: InventoryService,
  ) {
    // this.inventoryService.getErrorMessage().subscribe({
    //   next: err=> this.error =err
    // });
  }

  ngOnInit() {
    this.inventoryDataService.getAll();
    // this.store.dispatch(getInventory());
  }
}
