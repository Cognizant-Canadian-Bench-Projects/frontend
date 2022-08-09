import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root'
})

export class GeonameService {

  constructor(private httpClient:HttpClient) {}

   getZipcodesFromGeoName(zipcode:string):Observable<any>{
    console.log(zipcode);
    return this.httpClient.get(`http://api.geonames.org/findNearbyPostalCodesJSON?postalcode=${zipcode}&country=CA&radius=10&username=deepakAgarwal`)
   }
}
