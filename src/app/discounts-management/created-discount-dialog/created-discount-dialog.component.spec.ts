import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedDiscountDialogComponent } from './created-discount-dialog.component';

describe('CreatedDiscountDialogComponent', () => {
  let component: CreatedDiscountDialogComponent;
  let fixture: ComponentFixture<CreatedDiscountDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedDiscountDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedDiscountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
