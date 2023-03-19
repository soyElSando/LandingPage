import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarrouselComponent } from 'src/app/Shared/carrousel/carrousel.component';
import { ProyectosComponent } from './proyectos.component';

describe('ProyectosComponent', () => {
  let component: ProyectosComponent;
  let fixture: ComponentFixture<ProyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectosComponent ,
      CarrouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
