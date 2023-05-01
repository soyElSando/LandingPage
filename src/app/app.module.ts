import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Shared/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { ContactoComponent } from './contacto/contacto.component';
import { SobreMiComponent } from './sobreMi/sobre-mi.component';
import { CarrouselComponent } from './Shared/carrousel/carrousel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './Shared/services/login.service';
import { LanguageService } from './Shared/services/language.service';
import { SobreMiService } from './sobreMi/sobre-mi.service';
import { HomeService } from './home/home.service';
import { MailSenderService } from './contacto/mail-sender.service';
import { ProyectosService } from './proyectos/proyectos.service';
import { EducacionComponent } from './educacion/educacion.component';
import { ExperienciaComponent } from './experiencia/experiencia.component';
import { GetBackComponent } from './Shared/get-back/get-back.component';
import { LoginComponent } from './login/login.component';
import { BorrarExperienciaComponent } from './experiencia/borrar-experiencia/borrar-experiencia.component';
import { EditarExperienciaComponent } from './experiencia/editar-experiencia/editar-experiencia.component';
import { ExperienciaNuevaComponent } from './experiencia/experiencia-nueva/experiencia-nueva.component';
import { BorrarEducacionComponent } from './educacion/borrar-educacion/borrar-educacion.component';
import { EditarEducacionComponent } from './educacion/editar-educacion/editar-educacion.component';
import { EducacionNuevaComponent } from './educacion/educacion-nueva/educacion-nueva.component';
import { CommonModule } from '@angular/common';
import { ConocimientosComponent } from './conocimientos/conocimientos.component';
import { ConocimientoNuevoComponent } from './conocimientos/conocimiento-nuevo/conocimiento-nuevo.component';
import { BorrarConocimientoComponent } from './conocimientos/borrar-conocimiento/borrar-conocimiento.component';
import { EditarConocimientoComponent } from './conocimientos/editar-conocimiento/editar-conocimiento.component';
import { CategoriaSkillNuevaComponent } from './conocimientos/categoria-skill-nueva/categoria-skill-nueva.component';
import { BorrarCategoriaSkillComponent } from './conocimientos/borrar-categoria-skill/borrar-categoria-skill.component';
import { EditarDescripcionComponent } from './sobreMi/editar-descripcion/editar-descripcion.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SobreMiComponent,
    ProyectosComponent,
    ContactoComponent,
    CarrouselComponent,
    EducacionComponent,
    ExperienciaComponent,
    GetBackComponent,
    LoginComponent,
    BorrarExperienciaComponent,
    EditarExperienciaComponent,
    ExperienciaNuevaComponent,
    BorrarEducacionComponent,
    EditarEducacionComponent,
    EducacionNuevaComponent,
    ConocimientosComponent,
    ConocimientoNuevoComponent,
    BorrarConocimientoComponent,
    EditarConocimientoComponent,
    CategoriaSkillNuevaComponent,
    BorrarCategoriaSkillComponent,
    EditarDescripcionComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [LoginService,LanguageService, SobreMiService, HomeService, MailSenderService, ProyectosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
