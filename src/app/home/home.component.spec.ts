import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactoComponent } from 'src/app/contacto/contacto.component';
import { ProyectosComponent } from 'src/app/proyectos/proyectos.component';
import { CarrouselComponent } from 'src/app/Shared/carrousel/carrousel.component';
import { SobreMiComponent } from 'src/app/sobreMi/sobre-mi.component';
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
        ContactoComponent
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
