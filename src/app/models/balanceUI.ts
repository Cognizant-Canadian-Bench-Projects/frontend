import { Product } from './product';
import { LocationQuantity } from './locationQuantity';

export interface BalanceUI {
  id: number;
  product: Product;
  locationList: LocationQuantity[];
  quantity: number;
}

export function compareBalanceUI(b1: BalanceUI, b2: BalanceUI) {
  const compare = b1.id - b2.id;

  if (compare > 0) {
    return 1;
  } else if (compare < 0) {
    return -1;
  } else return 0;
}

export function compareBalanceUIByName(b1: BalanceUI, b2: BalanceUI) {
  const compare = b1.product.name < b2.product.name;

  if (!compare) {
    return 1;
  }
  return 0;
}
