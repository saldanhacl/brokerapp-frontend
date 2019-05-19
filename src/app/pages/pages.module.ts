import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import {StockTableComponent} from './stock-table/stock-table.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import { DialogStockQuantityPromptComponent } from './stock-table/dialog-stock-quantity-prompt/dialog-stock-quantity-prompt.component';
import {NbDialogModule, NbWindowModule} from '@nebular/theme';
import {SellOrderTableComponent} from './dashboard/sell-orders-smart-table/sell-order-table.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {BuyOrderTableComponent} from './dashboard/buy-orders-smart-table/buy-order-table.component';
import {WalletTableComponent} from './dashboard/wallet-smart-table/wallet-table.component';
import {
  DialogStockQuantityPricePromptComponent,
} from './stock-table/dialog-stock-quantity-price-prompt/dialog-stock-quantity-price-prompt.component';


const PAGES_COMPONENTS = [
  PagesComponent,
  StockTableComponent,
  DialogStockQuantityPromptComponent,
  DialogStockQuantityPricePromptComponent,
  WalletTableComponent,
  SellOrderTableComponent,
  BuyOrderTableComponent,
  DashboardComponent,
];

const MODULES = [
  NbDialogModule.forChild(),
  NbWindowModule.forChild(),
  PagesRoutingModule,
  ThemeModule,
  MiscellaneousModule,
  Ng2SmartTableModule,
];

const ENTRY_COMPONENTS = [
  DialogStockQuantityPromptComponent,
  DialogStockQuantityPricePromptComponent,
];

@NgModule({
  imports: [
    ...MODULES,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS,
  ],
})
export class PagesModule {
}
