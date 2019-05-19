import { of as observableOf,  Observable } from 'rxjs';
import {Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Response} from '../data/response';

@Injectable({
  providedIn: 'root',
})
export class OperationService {

  private buy_url = environment.api_url + 'operations/buy';
  private sell_url = environment.api_url + 'operations/sell';

  constructor(private http: HttpClient) { }

  // buyStock(stockId: number, walletId: number, quantity: number) {
  //
  //   // TODO fazer JSON Properties funcionar pra colocar cammelCase no backend
  //
  //   const body = {
  //     stockId: stockId,
  //     walletId: walletId,
  //     quantity: quantity,
  //   };
  //   return this.http.post(this.buy_url, body);
  // }

  createOperationOrder(userId: number, stockId: number, quantity: number, price: number, isSell: boolean) {

    // TODO fazer JSON Properties funcionar pra colocar cammelCase no backend

    const body = {
      userId: userId,
      stockId: stockId,
      quantity: quantity,
      price: price,
    };
    return isSell ? this.http.post<Response>(this.sell_url, body) : this.http.post(this.buy_url, body);
  }
}
