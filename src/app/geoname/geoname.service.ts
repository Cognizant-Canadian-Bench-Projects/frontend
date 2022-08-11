import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root',
})
export class GeonameService {
  constructor(private httpClient: HttpClient) {}

  getZipcodesFromGeoName(zipcode: string): Observable<any> {
    return this.httpClient.get(`http://http://localhost:8080/`);
  }
}
