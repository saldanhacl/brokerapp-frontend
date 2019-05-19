import {of as observableOf, Observable, BehaviorSubject} from 'rxjs';
import {Injectable, Injector} from '@angular/core';
import {Stock} from '../data/stock';
import {RestService} from 'angular4-hal';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private _shouldUpdateUI: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public readonly shouldUpdateUI: Observable<boolean> = this._shouldUpdateUI.asObservable();

  constructor() {
  }

  updateData() {
    this._shouldUpdateUI.next(true);
  }
}
