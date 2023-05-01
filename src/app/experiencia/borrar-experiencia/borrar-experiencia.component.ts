import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Experiencia } from 'src/app/experiencia/Experiencia.model';
import { ExperienciaService } from 'src/app/experiencia/experiencia.service';
import I18n from 'src/assets/I18n.json';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/Shared/services/language.service';

@Component({
  selector: 'app-borrar-experiencia',
  templateUrl: './borrar-experiencia.component.html',
  styleUrls: ['./borrar-experiencia.component.css']
})

export class BorrarExperienciaComponent implements OnInit {

  titulo = I18n.seccion.experience.delete
  botones = I18n.boton
  ediciones = I18n.ediciones.experience
  idiomaEspanol:boolean =true
  esEspanolSub: Subscription = new Subscription;

  @Input() experienciaABorrar?: Experiencia
  constructor(private experienciaService: ExperienciaService, private languageService:LanguageService) { }

  @Output() onDeleteEvent = new EventEmitter();
  
  ngOnInit(): void {
    this.esEspanolSub = this.languageService.esEspanol.subscribe((isAuthenticated: boolean)=>{
      this.idiomaEspanol = isAuthenticated
    })
  }

  ngOnDestroy() {
    this.esEspanolSub.unsubscribe();
  }

  onDelete():void{
    
    if(this.experienciaABorrar?.idExp!== undefined){
    this.experienciaService.deleteExperiencia(this.experienciaABorrar.idExp).subscribe(data => {      
      this.onDeleteEvent.emit();
    }, err =>{alert(this.idiomaEspanol ? "Algo salió mal" : "Something went wrong")
  })}
  }
}
