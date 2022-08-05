import { Pipe, PipeTransform } from '@angular/core';
import { Location } from '../models/location';
import { LocationQuantity } from '../models/locationQuantity';

@Pipe({
  name: 'locationName',
})
export class LocationNamePipe implements PipeTransform {
  transform(value: LocationQuantity[], locationName: string): LocationQuantity[] {
    if (locationName == '') {
      return value;
    }
    return value.filter((locationQuantity) =>
      locationQuantity.location.name.toLowerCase().match(locationName.toLowerCase())
    );
  }
}
