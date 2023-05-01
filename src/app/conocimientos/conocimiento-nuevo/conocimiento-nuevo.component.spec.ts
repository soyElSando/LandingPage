import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConocimientoNuevoComponent } from './conocimiento-nuevo.component';

describe('ConocimientoNuevoComponent', () => {
  let component: ConocimientoNuevoComponent;
  let fixture: ComponentFixture<ConocimientoNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConocimientoNuevoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConocimientoNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
