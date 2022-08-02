import { Pipe, PipeTransform } from '@angular/core';
import { BalanceUI } from '../models/balanceUI';
import { inventorySelectors } from '../inventory/inventory.selectors';

@Pipe({
  name: 'productName',
})
export class ProductNamePipe implements PipeTransform {
  transform(
    value: BalanceUI[],
    productName: string,
    locationName: string
  ): BalanceUI[] {
    if (productName == '') {
      return value;
    } else if (locationName == '') {
      return value.filter((balanceUI) =>
        balanceUI.product.name.toLowerCase().match(productName.toLowerCase())
      );
    }
    return value
      .filter((balanceUI) =>
        balanceUI.product.name.toLowerCase().match(productName.toLowerCase())
      )
      .filter((product) => {
        product.locationList.find((location) =>
          locationName.toLowerCase().match(location.location.name.toLowerCase())
        );
      });
  }
}
