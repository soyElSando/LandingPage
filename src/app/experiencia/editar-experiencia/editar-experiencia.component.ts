import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/Shared/services/language.service';
import { Experiencia } from 'src/app/experiencia/Experiencia.model';
import { ExperienciaService } from 'src/app/experiencia/experiencia.service';
import I18n from 'src/assets/I18n.json';

@Component({
  selector: 'app-editar-experiencia',
  templateUrl: './editar-experiencia.component.html',
  styleUrls: ['./editar-experiencia.component.css']
})
export class EditarExperienciaComponent implements OnInit {

  @Input() experienciaAEditar?: Experiencia

  empresaEditada: String | undefined = this.experienciaAEditar?.Empresa;
  puestoEsEditado: String | undefined = this.experienciaAEditar?.puestoEs;
  puestoEnEditado: String | undefined = this.experienciaAEditar?.puestoEn;
  logoEmpresaEditado: String | undefined = this.experienciaAEditar?.logoEmpresa;
  inicioEditado: String | undefined = this.experienciaAEditar?.inicio;
  finEditado: String | undefined = this.experienciaAEditar?.fin;
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
      const experienciaEditada: Experiencia = { idExp: idExpEditado, Empresa: empresaEditada, puestoEs: puestoEsEditado, puestoEn: puestoEnEditado, logoEmpresa: logoEmpresaEditado, inicio: inicioEditado, fin: finEditado };

      if (experienciaEditada !== undefined) {
        this.experienciaService.updateExperiencia(experienciaEditada).subscribe(data => {
          /* alert("Experiencia editada") */
          this.onEditEvent.emit();
        }, err => { alert(this.idiomaEspanol ? "Algo salió mal" : "Something went wrong") })

      }

    }

  }
}
