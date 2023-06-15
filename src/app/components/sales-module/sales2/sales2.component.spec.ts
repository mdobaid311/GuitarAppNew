import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sales2Component } from './sales2.component';

describe('Sales2Component', () => {
  let component: Sales2Component;
  let fixture: ComponentFixture<Sales2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sales2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sales2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
