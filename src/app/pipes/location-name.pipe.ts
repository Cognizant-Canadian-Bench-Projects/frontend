import { Pipe, PipeTransform } from '@angular/core';
import { BalanceUI } from '../models/balanceUI';
import { Location } from '../models/location';
import { LocationQuantity } from '../models/locationQuantity';

@Pipe({
  name: 'locationName',
})
export class LocationNamePipe implements PipeTransform {
  transform(value: BalanceUI[], locationName: string): BalanceUI[] {
    if (locationName == '') {
      return value;
    }
    return value.filter((balanceUI) =>
      balanceUI.locationList.some(
        (locationQuantity) =>
          locationQuantity.location.name.toLowerCase() ==
          locationName.toLowerCase()
      )
    );
  }
}
