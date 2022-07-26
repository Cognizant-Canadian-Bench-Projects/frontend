import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { BalanceUI } from '../models/balanceUI';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import {
  allProducts,
  getProductByName,
  getProductByNameAndLocation,
  selectErrorMessage,
} from './inventory.selectors';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  url = 'http://localhost:8080';

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  // getProductInventory(name: string): Observable<BalanceUI> {
  //   const params = new HttpParams().set('productName', name);
  //   return this.http.get<BalanceUI>(`${this.url}/balance`, { params: params });
  // }

  // getProductInventoryWithLocation(
  //   name: string,
  //   locationName: string
  // ): Observable<BalanceUI> {
  //   const params = new HttpParams()
  //     .set('productName', name)
  //     .set('locationName', locationName);
  //   return this.http.get<BalanceUI>(`${this.url}/balance`, { params: params });
  // }

  getInventory(): Observable<BalanceUI[]> {
    return this.http.get<BalanceUI[]>(`${this.url}/inventory`);
  }

  selectInventory() {
    return this.store.select(allProducts);
  }

  selectProductByName(name: string) {
    return this.store.select(getProductByName(name));
  }

  selectProductByNameAndLocation(product: string, location: string) {
    return this.store.select(getProductByNameAndLocation(product, location));
  }

  getErrorMessage(): Observable<string | null> {
    return this.store.select(selectErrorMessage);
  }
}
