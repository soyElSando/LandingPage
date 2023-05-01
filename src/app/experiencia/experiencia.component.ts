import { Component, OnInit } from '@angular/core';
import { Experiencia } from './Experiencia.model';
import { LoginService } from 'src/app/Shared/services/login.service';
import { ExperienciaService } from './experiencia.service';
import { LanguageService } from '../Shared/services/language.service';
import I18n from 'src/assets/I18n.json';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  experiencias: Experiencia[] = [];
  puestos: String = ""
  trabajoActual?: Experiencia
  titulo = I18n.seccion.experience.section
  esEspanolSub: Subscription = new Subscription;
  idiomaEspanol:boolean =true

  constructor(private experienciaService: ExperienciaService, private loginService: LoginService, private languageService: LanguageService) { }
  
  ngOnInit(): void {
    this.experienciaService.getExperiencias().subscribe(data => {
      this.experiencias = data;
    })

    this.esEspanolSub = this.languageService.esEspanol.subscribe((isAuthenticated: boolean)=>{
      this.idiomaEspanol = isAuthenticated
    })
  }

  ngOnDestroy() {
    this.esEspanolSub.unsubscribe();
  }

  public convertirEnArray(cadena: String): String[] {
    
    return cadena.split(",");
  }

  //  Esta función está para poder pasarle al modal la experiencia de cada iteración desde la vista. Hay que ver si lo puedo resolver de otra manera
  guardarTrabajo(trabajo: Experiencia) {
    this.trabajoActual = trabajo;
  }

  renderizar(){
    this.experienciaService.getExperiencias().subscribe(data => {
      this.experiencias = data;
  })}

  estaLogueado(){
    return this.loginService.isLoggedIn();
}

}