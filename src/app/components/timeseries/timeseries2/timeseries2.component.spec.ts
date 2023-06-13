import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Timeseries2Component } from './timeseries2.component';

describe('Timeseries2Component', () => {
  let component: Timeseries2Component;
  let fixture: ComponentFixture<Timeseries2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Timeseries2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Timeseries2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
