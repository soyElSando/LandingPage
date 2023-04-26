import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExperienciaService } from 'src/app/experiencia/experiencia.service';
import { Experiencia } from 'src/app/experiencia/Experiencia.model';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-experiencia-nueva',
  templateUrl: './experiencia-nueva.component.html',
  styleUrls: ['./experiencia-nueva.component.css']
})
export class ExperienciaNuevaComponent implements OnInit {
  puestoNuevo: String = "";
  empresaNueva: String = "";
  logoEmpresaNuevo: String = "";
  inicioNuevo: String = "";
  finNuevo: String = "";

  @Output() onCreateEvent = new EventEmitter();

  constructor(private experienciaService: ExperienciaService, private router: Router) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    if (this.empresaNueva.length === 0 || this.puestoNuevo.length === 0 || this.inicioNuevo.length === 0) {
      alert("El campo empresa, puesto e inicio deben tener contenido para poder crear la experiencia")
    } else {
      const { puestoNuevo, empresaNueva, logoEmpresaNuevo, inicioNuevo, finNuevo } = this;
      const nuevaExperiencia: Experiencia = { puesto: puestoNuevo, Empresa: empresaNueva, logoEmpresa: logoEmpresaNuevo, inicio: inicioNuevo, fin: finNuevo };
      this.experienciaService.createExperiencia(nuevaExperiencia).subscribe(data => {
        
        this.onCreateEvent.emit();
        this.puestoNuevo = "";
        this.empresaNueva = "";
        this.logoEmpresaNuevo = "";
        this.inicioNuevo = "";
        this.finNuevo = "";
      }, err => {
        alert("Algo salió mal")
      }
      );

    }
    }

  }
