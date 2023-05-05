import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomGuitarLoaderComponent } from './custom-guitar-loader.component';

describe('CustomGuitarLoaderComponent', () => {
  let component: CustomGuitarLoaderComponent;
  let fixture: ComponentFixture<CustomGuitarLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomGuitarLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomGuitarLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
