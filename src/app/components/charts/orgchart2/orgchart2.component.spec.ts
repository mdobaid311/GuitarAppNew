import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Orgchart2Component } from './orgchart2.component';

describe('Orgchart2Component', () => {
  let component: Orgchart2Component;
  let fixture: ComponentFixture<Orgchart2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Orgchart2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Orgchart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
