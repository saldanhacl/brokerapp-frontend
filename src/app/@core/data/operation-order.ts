import {Resource} from 'angular4-hal';
import {User} from './user';
import {Stock} from './stock';

export class OperationOrder extends Resource {
  id: number;
  user: User;
  stock: Stock;
  quantity: number;
  price: number;
  isSell: boolean;
  stockName: string;
  _embedded: any;
  constructor(user?: User, stock?: Stock, quantity?: number, price?: number, isSell?: boolean) {
    super();
    this.user = user ? user : null;
    this.stock = stock ? stock : null;
    this.quantity = quantity ? quantity : null;
    this.price = price ? price : null;
    this.isSell = isSell ? isSell : null;
  }
}
