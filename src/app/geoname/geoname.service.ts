import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root'
})

export class GeonameService {

  constructor(private httpClient:HttpClient) {}

   getNearByLocationFromZipcode(zipcode:string, country:string, radius:number):Observable<any>{
    console.log(zipcode);
    return this.httpClient.get(`http://localhost:8080/geoname?zipcode=${zipcode}&country=${country}&radius=${radius}`)

   }
}
