import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BalanceUI } from '../models/balanceUI';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }

  getProductInventory(name:string):Observable<BalanceUI>{
    const params = new HttpParams().set(
      'productName',name
    )
   return this.http.get<BalanceUI>(`http://localhost:8080/balance`,{params:params})
   }

   getProductInventoryWithLocation(name:string, locationName:string):Observable<BalanceUI>{
    const params = new HttpParams().set(
      'productName',name).set('locationName', locationName)
   return this.http.get<BalanceUI>(`http://localhost:8080/balance`,{params:params})
   }
  }
