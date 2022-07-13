import { Product } from "./inventory";
import { LocationQuantity } from "./locationQuantity";

export interface BalanceUI{
  product: Product,
  locationList:LocationQuantity[],
  quantity:number
}
