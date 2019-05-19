import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogStockQuantityPricePromptComponent } from './dialog-stock-quantity-price-prompt.component';

describe('DialogStockQuantityPricePromptComponent', () => {
  let component: DialogStockQuantityPricePromptComponent;
  let fixture: ComponentFixture<DialogStockQuantityPricePromptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogStockQuantityPricePromptComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogStockQuantityPricePromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
