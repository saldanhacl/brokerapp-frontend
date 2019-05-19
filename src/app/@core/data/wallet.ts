import {Resource} from 'angular4-hal';
import {User} from './user';
import {StockWallet} from './stock-wallet';

export class Wallet extends Resource {
  id: number;
  name: string;
  user: User;
  stocks: [StockWallet];
}
