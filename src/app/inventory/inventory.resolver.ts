import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { filter, first, tap } from "rxjs";
import { AppState } from "../app.state";
import { InventioryDataService } from "./inventiory-data.service";
import { inventorySelectors } from "./inventory.selectors";

@Injectable()
export class InventoryResolver implements Resolve<any>{
  constructor(private inventoryDataService: InventioryDataService){
    }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.inventoryDataService.loaded$.pipe(tap(loaded=>{
      if(!loaded){
        this.inventoryDataService.getAll();
      }
    }),filter(loaded=>!!loaded),
    first())
    // (tap(()=>{
    //   this.inventoryDataService.store.select(inventorySelectors)
    // }))
  }
  }
