import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Skill } from '../Skill.model';
import { SkillService } from '../skill.service';
import I18n from 'src/assets/I18n.json';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/Shared/services/language.service';

@Component({
  selector: 'app-borrar-conocimiento',
  templateUrl: './borrar-conocimiento.component.html',
  styleUrls: ['./borrar-conocimiento.component.css']
})
export class BorrarConocimientoComponent implements OnInit {

  ediciones = I18n.ediciones.skill.comentarioSkill
  botones = I18n.boton
  titulo = I18n.seccion.skills.delete
  idiomaEspanol:boolean =true
  esEspanolSub: Subscription = new Subscription;

  @Input() skillABorrar?: Skill
  @Output() onDeleteEvent = new EventEmitter();

  constructor( private conocimientoService: SkillService, private languageService:LanguageService) { }

  ngOnInit(): void {
    this.esEspanolSub = this.languageService.esEspanol.subscribe((isAuthenticated: boolean)=>{
      this.idiomaEspanol = isAuthenticated
    })
  }

  ngOnDestroy() {
    this.esEspanolSub.unsubscribe();
  }

  onDelete(){
    if(this.skillABorrar?.idSkill!== undefined){
      this.conocimientoService.deleteSkill(this.skillABorrar.idSkill).subscribe(data => {      
        this.onDeleteEvent.emit();
    }, err =>{alert(this.idiomaEspanol ? "Algo salió mal" : "Something went wrong")} )
   
      }

  }

}
