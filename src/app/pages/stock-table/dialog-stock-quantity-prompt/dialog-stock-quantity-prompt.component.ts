import {Component, Input} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'ngx-dialog-stock-quantity-prompt',
  templateUrl: './dialog-stock-quantity-prompt.component.html',
  styleUrls: ['./dialog-stock-quantity-prompt.component.scss'],
})
export class DialogStockQuantityPromptComponent {
  quantity: number;

  constructor(protected ref: NbDialogRef<DialogStockQuantityPromptComponent>) {}

  cancel() {
    this.ref.close();
  }

  submit(quantity) {
    this.ref.close(quantity);
  }
}
