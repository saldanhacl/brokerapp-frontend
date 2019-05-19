import { of as observableOf,  Observable } from 'rxjs';
import {Injectable, Injector} from '@angular/core';
import {Stock} from '../data/stock';
import {RestService} from 'angular4-hal';
import {StockWallet} from '../data/stock-wallet';

@Injectable({
  providedIn: 'root',
})
export class StockWalletService extends RestService<StockWallet> {

  constructor(injector: Injector) {
    super(StockWallet, 'stockWallets', injector);
  }

  public findByUser(user: string) {
    const options: any = {params: [{key: 'user', value: user}]};
    return this.search('findByUser', options);
  }

}
