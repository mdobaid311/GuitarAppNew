import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Orgchart3Component } from './orgchart3.component';

describe('Orgchart3Component', () => {
  let component: Orgchart3Component;
  let fixture: ComponentFixture<Orgchart3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Orgchart3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Orgchart3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
