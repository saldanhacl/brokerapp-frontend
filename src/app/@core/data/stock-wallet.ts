import {Resource} from 'angular4-hal';
import {Stock} from './stock';
import {Wallet} from './wallet';

export class StockWallet extends Resource {
  id: number;
  stock: Stock;
  wallet: Wallet;
  quantity: number;
}
