import {Component, Input} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'ngx-dialog-stock-quantity-prompt',
  templateUrl: './dialog-stock-quantity-price-prompt.component.html',
  styleUrls: ['./dialog-stock-quantity-price-prompt.component.scss'],
})
export class DialogStockQuantityPricePromptComponent {
  quantity: number;

  constructor(protected ref: NbDialogRef<DialogStockQuantityPricePromptComponent>) {}

  cancel() {
    this.ref.close();
  }

  submit(quantity, price) {
    const data = {
      quantity: quantity,
      price: price,
    };
    this.ref.close(data);
  }
}
