import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Shared/navbar/navbar.component';
import { HomeComponent } from './home/home/home.component';
import { ProyectosComponent } from './proyectos/proyectos/proyectos.component';
import { FormacionComponent } from './formacion/formacion/formacion.component';
import { ContactoComponent } from './contacto/contacto/contacto.component';
import { SobreMiComponent } from './sobreMi/sobre-mi/sobre-mi.component';
import { CarrouselComponent } from './Shared/carrousel/carrousel.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SobreMiComponent,
    ProyectosComponent,
    FormacionComponent,
    ContactoComponent,
    CarrouselComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
