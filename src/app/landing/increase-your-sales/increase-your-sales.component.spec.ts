import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncreaseYourSalesComponent } from './increase-your-sales.component';

describe('IncreaseYourSalesComponent', () => {
  let component: IncreaseYourSalesComponent;
  let fixture: ComponentFixture<IncreaseYourSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncreaseYourSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncreaseYourSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
