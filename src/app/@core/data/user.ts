import {Resource} from 'angular4-hal';
import {Wallet} from './wallet';

export class User extends Resource {
  id: number;
  name: string;
  wallet: Wallet;
}
