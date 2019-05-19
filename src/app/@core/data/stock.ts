import {Resource} from 'angular4-hal';

export class Stock extends Resource {
  id: number;
  name: string;
  code: string;
  description: string;
  quantity: number;
  unitPrice: number;
}
