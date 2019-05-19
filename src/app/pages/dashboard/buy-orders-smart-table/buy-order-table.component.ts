import {Component, Input, OnInit} from '@angular/core';
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import {NbToastStatus} from '@nebular/theme/components/toastr/model';
import {Stock} from '../../../@core/data/stock';
import {StockService} from '../../../@core/service/stock.service';
import {OperationService} from '../../../@core/service/operation.service';
import {UserService} from '../../../@core/service/users.service';
import {DialogStockQuantityPromptComponent} from '../../stock-table/dialog-stock-quantity-prompt/dialog-stock-quantity-prompt.component';
import {OperationOrderService} from '../../../@core/service/operation-order.service';
import {DataService} from '../../../@core/service/data.service';

@Component({
  selector: 'ngx-buy-order-table',
  templateUrl: './buy-order-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class BuyOrderTableComponent implements OnInit {

  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      stockName: {
        title: 'Ação',
        type: 'string',
      },
      quantity: {
        title: 'Quantidade',
        type: 'number',
      },
      price: {
        title: 'Preço R$',
        type: 'number',
      },
    },
  };

  source: Stock[];

  constructor(private stockService: StockService, private dialogService: NbDialogService,
              private operationService: OperationService, private userService: UserService,
              private toastr: NbToastrService, private operationOrderService: OperationOrderService,
              private dataService: DataService) {}

  async ngOnInit() {
    this.dataService.shouldUpdateUI.subscribe( data => {
      console.log('updating buy');
       this.fetchData();
    });
    await this.fetchData();
  }

  private async fetchData() {
    try {
      const user = localStorage.getItem('user');
      const result = await this.operationOrderService.findByUser(user, false).toPromise();
      this.source = result._embedded.operationOrders;    } catch (e) {
      console.log(e);
    }
  }

  onBuy(event) {
    this.dialogService.open(DialogStockQuantityPromptComponent)
      .onClose.subscribe(async quantity => {
        if (quantity) {
          await this.performOperation(event.data.id, this.userService.getCurrentWalletId(), quantity);
        }
    });
  }

  async performOperation(stockId: number, walletId: number, quantity: number) {
    try {

      // TODO colocar codigo http na resposta do backend e verificar para ver se atualiza os dados ou nao

      // await this.operationService.buyStock(stockId, walletId, quantity).toPromise();
      await this.fetchData();
      const config = {
        status: NbToastStatus.SUCCESS,
        position:  NbGlobalPhysicalPosition.TOP_RIGHT,
      };
      this.toastr.show('Sucesso', 'Compra feita com sucesso!', config);
    } catch (e) {
      const config = {
        status: NbToastStatus.DANGER,
        position:  NbGlobalPhysicalPosition.TOP_RIGHT,
      };
      this.toastr.show('Erro', 'Não foi possível realizar a compra...', config);
    }
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Tem certeza que deseja remover?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
