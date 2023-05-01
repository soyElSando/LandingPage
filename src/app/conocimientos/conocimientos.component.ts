import { Component, OnInit } from '@angular/core';
import { CategoriaSkill } from './CategoriaSkill.model';
import { Skill } from './Skill.model';
import { LoginService } from 'src/app/Shared/services/login.service';
import { SkillService } from './skill.service';
import { LanguageService } from '../Shared/services/language.service';
import I18n from 'src/assets/I18n.json';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-conocimientos',
  templateUrl: './conocimientos.component.html',
  styleUrls: ['./conocimientos.component.css']
})
export class ConocimientosComponent implements OnInit {

  conocimientos: Skill[]= [];
  categorias: CategoriaSkill[] = [];
  conocimientosFiltrados: Skill[] = [];
  skillActual?:Skill;
  catSkillActual?:number;
  titulo = I18n.seccion.skills
  esEspanolSub: Subscription = new Subscription;
  idiomaEspanol:boolean =true
  

  constructor(private skillService: SkillService, private autenticacionService: LoginService, private languageService: LanguageService) { }

  ngOnInit(): void {
      this.skillService.getSkills().subscribe(data => {    
      this.conocimientos = data;
      } );

      this.skillService.getCateSkills().subscribe(data => {    
      this.categorias = data;
      } );

      this.esEspanolSub = this.languageService.esEspanol.subscribe((isAuthenticated: boolean)=>{
        this.idiomaEspanol = isAuthenticated
      })
  }

  ngOnDestroy() {
    this.esEspanolSub.unsubscribe();
  }

  public filtrarPorCategoria(id: number | undefined): Skill[]{
    this.conocimientosFiltrados = this.conocimientos.filter(skill => skill.catSkill==id)
    return this.conocimientosFiltrados;
  }

  renderizar(){
    this.skillService.getSkills().subscribe(data => {    
      this.conocimientos = data;
    } );

      this.skillService.getCateSkills().subscribe(data => {    
      this.categorias = data;  
    } );
  }

  guardarSkill(skill: Skill){
    this.skillActual=skill;
  }

  guardarCategoriaSkill (catSkill: CategoriaSkill){
    this.catSkillActual = catSkill.idCatSkill;
  }

  estaLogueado(){
    return this.autenticacionService.isLoggedIn();
}
}
