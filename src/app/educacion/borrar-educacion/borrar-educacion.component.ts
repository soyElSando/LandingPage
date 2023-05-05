import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Educacion } from '../Educacion.model';
import { EducacionService } from '../educacion.service';
import I18n from 'src/assets/I18n.json';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/Shared/services/language.service';

@Component({
  selector: 'app-borrar-educacion',
  templateUrl: './borrar-educacion.component.html',
  styleUrls: ['./borrar-educacion.component.css']
})
export class BorrarEducacionComponent implements OnInit {

  botones = I18n.boton
  titulo = I18n.seccion.educacion.section.borrar
  idiomaEspanol:boolean =true
  esEspanolSub: Subscription = new Subscription;

  @Input() educacionABorrar?: Educacion
  @Output() onDeleteEvent = new EventEmitter();

  constructor(private educacionService: EducacionService, private languageService:LanguageService) { }

  ngOnInit(): void {
    this.esEspanolSub = this.languageService.esEspanol.subscribe((isAuthenticated: boolean)=>{
      this.idiomaEspanol = isAuthenticated
    })
  }

  ngOnDestroy() {
    this.esEspanolSub.unsubscribe();
  }

  onDelete(){
    if(this.educacionABorrar?.idEdu!== undefined){
      this.educacionService.deleteEducacion(this.educacionABorrar.idEdu).subscribe(data => {      
        this.onDeleteEvent.emit();
    }, err =>{alert(this.idiomaEspanol ? "Algo salió mal" : "Something went wrong")} )
      }
  }

}
