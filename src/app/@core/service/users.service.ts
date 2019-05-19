import { Injectable } from '@angular/core';
import {ResourceService} from 'angular4-hal/src/resource.service';
import {User} from '../data/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor() {}

  setCurrentWalletId() {
    localStorage.setItem('wallet_id', '1');
  }

  setCurrentUserId() {
    localStorage.setItem('user_id', '1');
    localStorage.setItem('user', 'http://localhost:8080/users/1');
  }

  getCurrentWalletId(): number {
    return +localStorage.getItem('wallet_id');
  }

  getCurrentUserId(): number {
    return +localStorage.getItem('user_id');
  }
}
