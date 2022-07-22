import { Product } from "./product";
import { LocationQuantity } from "./locationQuantity";

export interface BalanceUI{
  product: Product,
  locationList:LocationQuantity[],
  quantity:number
}
