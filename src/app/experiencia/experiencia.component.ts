import { Component, OnInit } from '@angular/core';
import { Experiencia } from './Experiencia.model';
import { LoginService } from 'src/app/Shared/services/login.service';
import { ExperienciaService } from './experiencia.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  experiencias: Experiencia[] = [];
  puestos: String = ""
  trabajoActual?: Experiencia

  constructor(private experienciaService: ExperienciaService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.experienciaService.getExperiencias().subscribe(data => {
      this.experiencias = data;
    })
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