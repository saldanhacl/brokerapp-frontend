import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogStockQuantityPromptComponent } from './dialog-stock-quantity-prompt.component';

describe('DialogStockQuantityPricePromptComponent', () => {
  let component: DialogStockQuantityPromptComponent;
  let fixture: ComponentFixture<DialogStockQuantityPromptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogStockQuantityPromptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogStockQuantityPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
