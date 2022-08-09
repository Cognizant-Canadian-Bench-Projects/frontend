import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Observable } from 'rxjs';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root'
})

export class GeonameDataService extends EntityCollectionServiceBase<Location> {

  constructor(serviceElementsFactory:EntityCollectionServiceElementsFactory) {
    super('Location', serviceElementsFactory);
   }

  //  getZipcodesFromGeoName(zipcode:string):Observable<any>{
  //   return this.httpClient.get("api.geonames.org/findNearbyPostalCodesJSON?postalcode=8775&country=CA&radius=10&username=deepakAgarwal")
  //  }
}
