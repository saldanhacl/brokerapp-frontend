import { of as observableOf,  Observable } from 'rxjs';
import {Injectable, Injector} from '@angular/core';
import {Stock} from '../data/stock';
import {RestService} from 'angular4-hal';

@Injectable({
  providedIn: 'root',
})
export class StockService extends RestService<Stock> {

  constructor(injector: Injector) {
    super(Stock, 'stocks', injector);
  }

  buyStock(quantity: any, id: any) {
  }
}
