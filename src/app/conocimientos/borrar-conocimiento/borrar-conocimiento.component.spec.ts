import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarConocimientoComponent } from './borrar-conocimiento.component';

describe('BorrarConocimientoComponent', () => {
  let component: BorrarConocimientoComponent;
  let fixture: ComponentFixture<BorrarConocimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrarConocimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrarConocimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
