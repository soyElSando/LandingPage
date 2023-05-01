import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoriaSkill } from '../CategoriaSkill.model';
import { SkillService } from '../skill.service';
import I18n from 'src/assets/I18n.json';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/Shared/services/language.service';

@Component({
  selector: 'app-borrar-categoria-skill',
  templateUrl: './borrar-categoria-skill.component.html',
  styleUrls: ['./borrar-categoria-skill.component.css']
})
export class BorrarCategoriaSkillComponent implements OnInit {

  categoria:CategoriaSkill |undefined;
  ediciones = I18n.ediciones.skill.comentarioCat
  botones = I18n.boton
  titulo = I18n.seccion.skills.deleteCat
  idiomaEspanol:boolean =true
  esEspanolSub: Subscription = new Subscription;

  @Input() catSkillABorrar?: number
  @Output() onDeleteEvent = new EventEmitter();

  constructor(private skillService: SkillService, private languageService:LanguageService) { }

  ngOnInit(): void {
    this.esEspanolSub = this.languageService.esEspanol.subscribe((isAuthenticated: boolean)=>{
      this.idiomaEspanol = isAuthenticated
    })

    this.skillService.getCateSkills()
      .subscribe(data=>
        this.categoria=
        data.find((item:CategoriaSkill) =>
          item.idCatSkill==this.catSkillABorrar)
      )
  }

  ngOnDestroy() {
    this.esEspanolSub.unsubscribe();
  }

  onDelete() {
    if(this.catSkillABorrar!== undefined){
      this.skillService.deleteSkill(this.catSkillABorrar).subscribe(data => {      
        this.onDeleteEvent.emit();
    }, err =>{alert(this.idiomaEspanol ? "Algo salió mal" : "Something went wrong")}
    )}
  }

}
