import { Pipe, PipeTransform } from '@angular/core';
import { LocationQuantity } from '../models/locationQuantity';

@Pipe({
  name: 'locationByDistance'
})
export class LocationByDistancePipe implements PipeTransform {

  transform(value: LocationQuantity[], zipcodeSubmitted: boolean): LocationQuantity[] {
    debugger;
    if(zipcodeSubmitted && value.length > 1){
      let sortLocations: LocationQuantity[] = [];
      value.forEach(location => sortLocations.push(location));
      return sortLocations.sort((lQ1, lQ2)=>
        lQ1.location.distance - lQ2.location.distance)
    }
    return value;
  }

}
