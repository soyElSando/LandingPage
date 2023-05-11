import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CategoriaSkillWithId } from '../CategoriaSkill.model';
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

  categoria:CategoriaSkillWithId |undefined;
  categorias:CategoriaSkillWithId[]=[];
  ediciones = I18n.ediciones.skill.comentarioCat
  botones = I18n.boton
  titulo = I18n.seccion.skills.deleteCat
  idiomaEspanol:boolean =true
  esEspanolSub: Subscription = new Subscription;
  cateSub:Subscription = new Subscription;

  @Input() catSkillABorrar?: number
  @Output() onDeleteEvent = new EventEmitter();

  constructor(private skillService: SkillService, private languageService:LanguageService) { 
    
  }

  ngOnInit(): void {
    this.esEspanolSub = this.languageService.esEspanol.subscribe((isAuthenticated: boolean)=>{
      this.idiomaEspanol = isAuthenticated
    })
    this.renderizar()
    
  }

  renderizar (){
    this.cateSub = this.skillService.getCateSkills()
    .subscribe(data=>{this.categorias=data
      let x = this.categorias.find(item =>
        item.idCatSkill==this.catSkillABorrar)
      if(x){
        this.categoria=x;
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    
      this.renderizar()
  }

  ngOnDestroy() {
    this.esEspanolSub.unsubscribe();
  }

  onDelete() {
    if(this.catSkillABorrar!== undefined){
      this.skillService.deleteCateSkill(this.catSkillABorrar).subscribe(data => {      
        this.onDeleteEvent.emit();
    }, err =>{alert(this.idiomaEspanol ? "Algo salió mal" : "Something went wrong")}
    )}
  }

}
