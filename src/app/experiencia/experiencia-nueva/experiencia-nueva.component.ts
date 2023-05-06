import { Component, OnInit } from '@angular/core';
import { ExperienciaService } from 'src/app/experiencia/experiencia.service';
import { Experiencia } from 'src/app/experiencia/Experiencia.model';
import { Output, EventEmitter } from '@angular/core';
import I18n from 'src/assets/I18n.json';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/Shared/services/language.service';


@Component({
  selector: 'app-experiencia-nueva',
  templateUrl: './experiencia-nueva.component.html',
  styleUrls: ['./experiencia-nueva.component.css']
})
export class ExperienciaNuevaComponent implements OnInit {
  
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

  @Output() onCreateEvent = new EventEmitter();

  constructor(private experienciaService: ExperienciaService, private languageService:LanguageService) { }

  ngOnInit(): void {
    this.esEspanolSub = this.languageService.esEspanol.subscribe((isAuthenticated: boolean)=>{
      this.idiomaEspanol = isAuthenticated
    })
  }

  ngOnDestroy() {
    this.esEspanolSub.unsubscribe();
  }

  onCreate(): void {
    if (this.empresaNueva.length === 0 || this.puestoEsNuevo.length === 0 || this.puestoEnNuevo.length === 0 || this.inicioNuevo.length === 0) {
      alert(this.idiomaEspanol ?
         "El campo empresa, puesto e inicio deben tener contenido para poder crear la experiencia"
          : "Company name, position and from date must be specified for creating a new experience")
    } else {
      const { puestoEsNuevo, puestoEnNuevo, empresaNueva, logoEmpresaNuevo, inicioNuevo, finNuevo } = this;
      const nuevaExperiencia: Experiencia = { puestoEs: puestoEsNuevo, puestoEn: puestoEnNuevo, Empresa: empresaNueva, logoEmpresa: logoEmpresaNuevo, inicio: inicioNuevo, fin: finNuevo };
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
    }

  }
