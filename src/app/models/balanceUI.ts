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
