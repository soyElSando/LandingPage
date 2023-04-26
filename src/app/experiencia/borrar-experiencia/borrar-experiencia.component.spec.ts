import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarExperienciaComponent } from './borrar-experiencia.component';

describe('BorrarExperienciaComponent', () => {
  let component: BorrarExperienciaComponent;
  let fixture: ComponentFixture<BorrarExperienciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrarExperienciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarExperienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
