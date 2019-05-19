import {Component, Input, OnInit} from '@angular/core';
import {Stock} from '../../@core/data/stock';
import {StockService} from '../../@core/service/stock.service';
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import {DialogStockQuantityPromptComponent} from './dialog-stock-quantity-prompt/dialog-stock-quantity-prompt.component';
import {OperationService} from '../../@core/service/operation.service';
import {UserService} from '../../@core/service/users.service';
import {NbToastStatus} from '@nebular/theme/components/toastr/model';
import {Response} from '../../@core/data/response';
import {DialogStockQuantityPricePromptComponent} from './dialog-stock-quantity-price-prompt/dialog-stock-quantity-price-prompt.component';

@Component({
  selector: 'ngx-stock-table',
  templateUrl: './stock-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class StockTableComponent implements OnInit {

  settings = {
    actions: {
      columnTitle: 'Comprar',
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'buy',
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
      description: {
        title: 'Descrição',
        type: 'string',
      },
      unitPrice: {
        title: 'Preço atual (R$)',
        type: 'number',
      },
    },
  };

  source: Stock[];

  constructor(private stockService: StockService, private dialogService: NbDialogService,
              private operationService: OperationService, private userService: UserService,
              private toastr: NbToastrService) {}

  async ngOnInit() {
    await this.fetchData();
  }

  private async fetchData() {
    try {
      this.source = await this.stockService.getAll().toPromise();
    } catch (e) {
      console.log(e);
    }
  }

  onBuy(event) {
    this.dialogService.open(DialogStockQuantityPricePromptComponent)
      .onClose.subscribe(async data => {
        if (data) {
          await this.performOperationOrder(
            this.userService.getCurrentUserId(),
            event.data.id,
            data.quantity,
            data.price,
          );
        }
    });
  }

  async performOperationOrder(userId: number, stockId: number, quantity: number, price: number) {
    try {
      const configSuccess = {
        status: NbToastStatus.SUCCESS,
        position:  NbGlobalPhysicalPosition.TOP_RIGHT,
      };

      const configInfo = {
        status: NbToastStatus.INFO,
        position:  NbGlobalPhysicalPosition.TOP_RIGHT,
      };
      // TODO colocar codigo http na resposta do backend e verificar para ver se atualiza os dados ou nao

      const result = await this.operationService.createOperationOrder(userId, stockId, quantity, price, false).toPromise() as Response;
      if (result.body === true) {
        this.toastr.show('Compra efetuada com sucesso', 'Sucesso', configSuccess);
      } else {
        this.toastr.show('Foi enviado um pedido de compra', 'Quase lá',  configInfo);
      }
      await this.fetchData();
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
