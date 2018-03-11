import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyDiscountComponent } from './any-discount.component';

describe('AnyDiscountComponent', () => {
  let component: AnyDiscountComponent;
  let fixture: ComponentFixture<AnyDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
