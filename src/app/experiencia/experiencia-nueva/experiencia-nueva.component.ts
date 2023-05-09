import { Component, OnInit } from '@angular/core';
import { ExperienciaService } from 'src/app/experiencia/experiencia.service';
import { Experiencia } from 'src/app/experiencia/Experiencia.model';
import { Output, EventEmitter } from '@angular/core';
import I18n from 'src/assets/I18n.json';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/Shared/services/language.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-experiencia-nueva',
  templateUrl: './experiencia-nueva.component.html',
  styleUrls: ['./experiencia-nueva.component.css']
})
export class ExperienciaNuevaComponent implements OnInit {
  
  errorFin:boolean= false;
  puestoEsNuevo: string = "";
  puestoEnNuevo: string = "";
  empresaNueva: string = "";
  logoEmpresaNuevo: string = "";
  inicioNuevo: string = "";
  finNuevo: string = "";
  titulo = I18n.seccion.experience.new
  botones = I18n.boton
  ediciones = I18n.ediciones.experience
  idiomaEspanol:boolean =true
  esEspanolSub: Subscription = new Subscription;
  finNuevoControl = new FormControl();

  @Output() onCreateEvent = new EventEmitter();

  constructor(private experienciaService: ExperienciaService, private languageService:LanguageService) {
    /* this.finNuevoControl.valueChanges.subscribe(() => {
      const fin = new Date(this.finNuevo);
      const inicio = new Date(this.inicioNuevo);
      console.log( fin );
      this.errorFin = (this.finNuevo.length > 0 && fin < inicio);
    }); */
  }
   

  ngOnInit(): void {
    this.esEspanolSub = this.languageService.esEspanol.subscribe((isAuthenticated: boolean)=>{
      this.idiomaEspanol = isAuthenticated
    })
  }

  /* onChange() {
    // obtener los valores de las fechas de inicio y fin ingresadas por el usuario
    const inicio = new Date(this.inicioNuevo);
    const fin = new Date(this.finNuevo);

    // comparar las fechas
    if (fin < inicio) {
      this.errorFin = true;
    }else {
      this.errorFin = true;
    }
  } */

  ngOnDestroy() {
    this.esEspanolSub.unsubscribe();
  }

  onCreate(): void {
    if (this.empresaNueva.length === 0 || this.puestoEsNuevo.length === 0 || this.puestoEnNuevo.length === 0 || this.inicioNuevo.length === 0) {
      alert(this.idiomaEspanol ?
        "El campo empresa, puesto e inicio deben tener contenido para poder crear la experiencia"
        : "Company name, position and from date must be specified for creating a new experience")
    } else {
      const inicio = new Date(this.inicioNuevo);
      const fin = new Date(this.finNuevo);
      if (this.finNuevo.length > 0 && fin < inicio) {
        alert(this.idiomaEspanol ?
          "La fecha de fin no puede ser anterior a la fecha de inicio"
          : "End date cannot be before start date");
        return;
      }
      const nuevaExperiencia: Experiencia = { puestoEs: this.puestoEsNuevo, puestoEn: this.puestoEnNuevo, empresa: this.empresaNueva, logoEmpresa: this.logoEmpresaNuevo, inicio: this.inicioNuevo, fin: this.finNuevo };
      this.experienciaService.createExperiencia(nuevaExperiencia).subscribe(data => {
        this.onCreateEvent.emit();
        this.puestoEsNuevo = "";
        this.puestoEnNuevo = "";
        this.empresaNueva = "";
        this.logoEmpresaNuevo = "";
        this.inicioNuevo = "";
        this.finNuevo = "";
      }, err => {
        alert(this.idiomaEspanol ? "Algo salió mal" : "Something went wrong")
      });
    }
  }
  /* 
  onCreate(): void {
    if (this.empresaNueva.length === 0 || this.puestoEsNuevo.length === 0 || this.puestoEnNuevo.length === 0 || this.inicioNuevo.length === 0) {
      alert(this.idiomaEspanol ?
         "El campo empresa, puesto e inicio deben tener contenido para poder crear la experiencia"
          : "Company name, position and from date must be specified for creating a new experience")
    } else {
      const { puestoEsNuevo, puestoEnNuevo, empresaNueva, logoEmpresaNuevo, inicioNuevo, finNuevo } = this;
      const nuevaExperiencia: Experiencia = { puestoEs: puestoEsNuevo, puestoEn: puestoEnNuevo, empresa: empresaNueva, logoEmpresa: logoEmpresaNuevo, inicio: inicioNuevo, fin: finNuevo };
      this.experienciaService.createExperiencia(nuevaExperiencia).subscribe(data => {
        
        this.onCreateEvent.emit();
        this.puestoEsNuevo = "";
        this.puestoEnNuevo = "";
        this.empresaNueva = "";
        this.logoEmpresaNuevo = "";
        this.inicioNuevo = "";
        this.finNuevo = "";
      }, err => {
        alert(this.idiomaEspanol ? "Algo salió mal" : "Something went wrong")
      }
      );

    }
    } */

  }
