import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoriaSkill } from '../CategoriaSkill.model';
import { SkillService } from '../skill.service';
import I18n from 'src/assets/I18n.json';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/Shared/services/language.service';

@Component({
  selector: 'app-categoria-skill-nueva',
  templateUrl: './categoria-skill-nueva.component.html',
  styleUrls: ['./categoria-skill-nueva.component.css']
})
export class CategoriaSkillNuevaComponent implements OnInit {

  @Output() onCreateEvent = new EventEmitter();

  nombreCatSkillEsNueva?: string
  nombreCatSkillEnNueva?: string
  ediciones = I18n.ediciones.skill.comentarioCat
  botones = I18n.boton
  titulo = I18n.seccion.skills.newCat
  idiomaEspanol:boolean =true
  esEspanolSub: Subscription = new Subscription;
  

  constructor(private skillService: SkillService, private languageService: LanguageService) { }

  ngOnInit(): void {
    this.esEspanolSub = this.languageService.esEspanol.subscribe((isAuthenticated: boolean)=>{
      this.idiomaEspanol = isAuthenticated
    })
  }

  ngOnDestroy() {
    this.esEspanolSub.unsubscribe();
  }

  onCreate(){

    if (this.nombreCatSkillEsNueva && this.nombreCatSkillEnNueva) {

      const nuevaCatSkill: CategoriaSkill = { nombreCatSkillEs: this.nombreCatSkillEsNueva,  nombreCatSkillEn: this.nombreCatSkillEnNueva};

      this.skillService.createCateSkill(nuevaCatSkill).subscribe(data => {
        this.onCreateEvent.emit();
        this.nombreCatSkillEsNueva = "";
        this.nombreCatSkillEnNueva = "";
      }, err => {
        console.log(err);
        alert(this.idiomaEspanol ? "Algo salió mal" : "Something went wrong")
      }
      );

    }
  }
}
