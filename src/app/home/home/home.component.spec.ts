import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormacionComponent } from 'src/app/formacion/formacion/formacion.component';
import { ProyectosComponent } from 'src/app/proyectos/proyectos/proyectos.component';
import { CarrouselComponent } from 'src/app/Shared/carrousel/carrousel.component';
import { SobreMiComponent } from 'src/app/sobreMi/sobre-mi/sobre-mi.component';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        HomeComponent ,
        CarrouselComponent,
        SobreMiComponent,
        ProyectosComponent,
        FormacionComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
