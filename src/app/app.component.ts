import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { InventoryService } from './inventory/inventory.service';
import {tap} from "rxjs/operators";
import { noop } from 'rxjs';
import { getInventory } from './inventory/inventory.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'inventory system';
  error = ''

  constructor(private store: Store<AppState>,
    private inventoryService: InventoryService){}

  ngOnInit(){

    this.inventoryService.getInventory()
    .subscribe(
      {
        next:inventory => {
          this.store.dispatch(getInventory({inventory}));
        },
        error:(err)=> {this.error ="couldnt load inventory"}
      }
    )

  }
}
