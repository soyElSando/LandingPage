import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/Shared/services/language.service';
import { Experiencia, ExperienciaWithId } from 'src/app/experiencia/Experiencia.model';
import { ExperienciaService } from 'src/app/experiencia/experiencia.service';
import I18n from 'src/assets/I18n.json';

@Component({
  selector: 'app-editar-experiencia',
  templateUrl: './editar-experiencia.component.html',
  styleUrls: ['./editar-experiencia.component.css']
})
export class EditarExperienciaComponent implements OnInit {

  @Input() experienciaAEditar?: Experiencia

  empresaEditada: string | undefined = this.experienciaAEditar?.Empresa;
  puestoEsEditado: string | undefined = this.experienciaAEditar?.puestoEs;
  puestoEnEditado: string | undefined = this.experienciaAEditar?.puestoEn;
  logoEmpresaEditado: string | undefined = this.experienciaAEditar?.logoEmpresa;
  inicioEditado: string | undefined = this.experienciaAEditar?.inicio;
  finEditado: string | undefined = this.experienciaAEditar?.fin;
  idExpEditado: number | undefined = this.experienciaAEditar?.idExp;
  titulo = I18n.seccion.experience.edit
  botones = I18n.boton
  ediciones = I18n.ediciones.experience
  idiomaEspanol:boolean =true
  esEspanolSub: Subscription = new Subscription;

  /* experienciaEditada: Experiencia | undefined; */

  @Output() onEditEvent = new EventEmitter();


  constructor(private experienciaService: ExperienciaService, private languageService:LanguageService) { }

  ngOnInit(): void {
    this.esEspanolSub = this.languageService.esEspanol.subscribe((isAuthenticated: boolean)=>{
      this.idiomaEspanol = isAuthenticated
    })
  }

  ngOnDestroy() {
    this.esEspanolSub.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.idExpEditado = this.experienciaAEditar?.idExp;
    this.empresaEditada = this.experienciaAEditar?.Empresa;
    this.puestoEsEditado = this.experienciaAEditar?.puestoEs;
    this.puestoEnEditado = this.experienciaAEditar?.puestoEn;
    this.logoEmpresaEditado = this.experienciaAEditar?.logoEmpresa;
    this.inicioEditado = this.experienciaAEditar?.inicio;
    this.finEditado = this.experienciaAEditar?.fin;

  }

  onEdit() {

    if (this.puestoEsEditado && this.puestoEnEditado && this.empresaEditada && this.logoEmpresaEditado && this.inicioEditado && this.finEditado && this.idExpEditado) {
      const { idExpEditado, empresaEditada, puestoEsEditado, puestoEnEditado, logoEmpresaEditado, inicioEditado, finEditado } = this
      const experienciaEditada: ExperienciaWithId = { idExp: idExpEditado, Empresa: empresaEditada, puestoEs: puestoEsEditado, puestoEn: puestoEnEditado, logoEmpresa: logoEmpresaEditado, inicio: inicioEditado, fin: finEditado };

      if (experienciaEditada !== undefined) {
        this.experienciaService.updateExperiencia(experienciaEditada).subscribe(data => {
          /* alert("Experiencia editada") */
          this.onEditEvent.emit();
        }, err => { alert(this.idiomaEspanol ? "Algo salió mal" : "Something went wrong") })

      }

    }else {
      alert(this.idiomaEspanol ?
         "¡Debe completar todos los campos! No deje vacía la categoría" 
      : "You must complete all fields! Do not leave the category box empty")
    }

  }
}
