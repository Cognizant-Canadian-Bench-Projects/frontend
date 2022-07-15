import { Component } from '@angular/core';
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
export class AppComponent {
  title = 'frontend';

  constructor(private store: Store<AppState>,
    private inventoryService: InventoryService){}

  ngOnInit(){
    
    this.inventoryService.getInventory()
    .pipe(
      tap(inventory => {
        this.store.dispatch(getInventory({inventory}));
      })
    ).subscribe(
      noop,
      (err)=> console.log(err.error)
    )

  }
}
