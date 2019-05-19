import {Component, Input, OnInit} from '@angular/core';
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import {NbToastStatus} from '@nebular/theme/components/toastr/model';
import {Stock} from '../../../@core/data/stock';
import {StockService} from '../../../@core/service/stock.service';
import {OperationService} from '../../../@core/service/operation.service';
import {UserService} from '../../../@core/service/users.service';
import {
  DialogStockQuantityPricePromptComponent,
} from '../../stock-table/dialog-stock-quantity-price-prompt/dialog-stock-quantity-price-prompt.component';
import {StockWalletService} from '../../../@core/service/stock-wallet.service';
import {StockWallet} from '../../../@core/data/stock-wallet';
import {DataService} from '../../../@core/service/data.service';

@Component({
  selector: 'ngx-wallet-table',
  templateUrl: './wallet-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class WalletTableComponent implements OnInit {

  settings = {
    actions: {
      columnTitle: 'Vender',
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'sell',
          title:  '<i class="nb-compose"></i>',
        },
      ],
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      name: {
        title: 'Ação',
        type: 'string',
      },
      code: {
        title: 'Código',
        type: 'string',
      },
      quantity: {
        title: 'Quantidade',
        type: 'number',
      },
    },
  };

  source: StockWallet[];

  constructor(private stockWalletService: StockWalletService, private dialogService: NbDialogService,
              private operationService: OperationService, private userService: UserService,
              private dataService: DataService, private toastr: NbToastrService) {}

  async ngOnInit() {
    this.dataService.shouldUpdateUI.subscribe( data => {
      console.log('updating wallet');
      this.fetchData();
    });
    await this.fetchData();
  }

  private async fetchData() {
    try {
      const result = await this.stockWalletService.findByUser(localStorage.getItem('user')).toPromise() as [StockWallet];
      await this.buildArrayOfStocks(result);
    } catch (e) {
      console.log(e);
    }
  }

  private async buildArrayOfStocks(stockWallets: [StockWallet]) {
    const stocks = [];
    for (const stockWallet of stockWallets) {
      const stock = await stockWallet.getRelation(Stock, 'stock').toPromise();
      stock.quantity = stockWallet.quantity;
      stocks.push(stock);
    }
    this.source = stocks;
  }

  onBuy(event) {
    this.dialogService.open(DialogStockQuantityPricePromptComponent)
      .onClose.subscribe(async data => {
        if (data) {
          await this.performOperationOrder(
            this.userService.getCurrentUserId(),
            event.data.id,
            data.quantity,
            data.price);
        }
    });
  }

  async performOperationOrder(userId: number, stockId: number, quantity: number, price: number) {
    try {

      // TODO colocar codigo http na resposta do backend e verificar para ver se atualiza os dados ou nao

      await this.operationService.createOperationOrder(userId, stockId, quantity, price, true).toPromise();
      this.dataService.updateData();
      const config = {
        status: NbToastStatus.SUCCESS,
        position:  NbGlobalPhysicalPosition.TOP_RIGHT,
      };
      this.toastr.show('Sucesso', 'Venda feita com sucesso!', config);
    } catch (e) {
      const config = {
        status: NbToastStatus.DANGER,
        position:  NbGlobalPhysicalPosition.TOP_RIGHT,
      };
      this.toastr.show('Erro', 'Não foi possível realizar a venda...', config);
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
