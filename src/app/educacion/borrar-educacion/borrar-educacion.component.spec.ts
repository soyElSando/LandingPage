import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarEducacionComponent } from './borrar-educacion.component';

describe('BorrarEducacionComponent', () => {
  let component: BorrarEducacionComponent;
  let fixture: ComponentFixture<BorrarEducacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrarEducacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrarEducacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
