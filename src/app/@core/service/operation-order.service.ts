import { of as observableOf,  Observable } from 'rxjs';
import {Injectable, Injector} from '@angular/core';
import {Resource, ResourceArray, ResourceHelper, RestService} from 'angular4-hal';
import {OperationOrder} from '../data/operation-order';
import {User} from '../data/user';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OperationOrderService extends RestService<OperationOrder> {

  private find_by_user_url = environment.api_url + 'operationOrders/search/findByUserAndIsSell?user=';
  private isSell_endpoint = '&isSell=';
  private sell_order_projection_endpoint = '&projection=sellOrderProjection';

  constructor(injector: Injector, public http: HttpClient) {
    super(OperationOrder, 'operationOrders', injector);
  }

  public findByUser(user: string, isSell: boolean) {
    // const options: any = {params: [{key: 'user', value: user}]};
    // return this.search('findByUser', options);
    const fullUrl = this.find_by_user_url + user +
                    this.isSell_endpoint + isSell +
                    this.sell_order_projection_endpoint;
    return this.http.get<OperationOrder>(fullUrl);
  }

}
