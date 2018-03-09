import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CocosAppComponent } from './cocos-app.component';

describe('CocosAppComponent', () => {
  let component: CocosAppComponent;
  let fixture: ComponentFixture<CocosAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CocosAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CocosAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
