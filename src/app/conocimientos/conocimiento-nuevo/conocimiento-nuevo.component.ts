import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CategoriaSkill, CategoriaSkillWithId } from '../CategoriaSkill.model';
import { Skill } from '../Skill.model';
import { SkillService } from '../skill.service';
import I18n from 'src/assets/I18n.json';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/Shared/services/language.service';

@Component({
  selector: 'app-conocimiento-nuevo',
  templateUrl: './conocimiento-nuevo.component.html',
  styleUrls: ['./conocimiento-nuevo.component.css']
})
export class ConocimientoNuevoComponent implements OnInit {

  @Input() catSkillAsignada?: number
  categoriaAsignada: CategoriaSkillWithId ={
    "idCatSkill":1,
    "nombreCatSkillEs":"Tecnología Front-End",
    "nombreCatSkillEn":"Front-End technologies"
  }
  nombreSkillNuevo: string = "";
  avanceNuevo?: number
  catSkillNuevo?: CategoriaSkill;
  categorias: CategoriaSkillWithId[] = [];
  idCatSkillNueva: number = 0;
  nuevoSkill?: Skill
  ediciones = I18n.ediciones.skill
  botones = I18n.boton
  titulo = I18n.seccion.skills.new
  idiomaEspanol:boolean =true
  esEspanolSub: Subscription = new Subscription;

  @Output() onCreateEvent = new EventEmitter();

  constructor(private skillService: SkillService, private languageService: LanguageService) { }

  ngOnInit(): void {
    this.skillService.getCateSkills().subscribe(data => {
      this.categorias = data;
    })

    this.esEspanolSub = this.languageService.esEspanol.subscribe((isAuthenticated: boolean)=>{
      this.idiomaEspanol = isAuthenticated
    })
  }

  ngOnDestroy() {
    this.esEspanolSub.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    let x = this.categorias.find(item=>item.idCatSkill==this.catSkillAsignada)
    if(x){
      this.categoriaAsignada = x
    }
    
  
  }

  onCreate(){
/*     if (this.idCatSkillNueva == 0) {
      alert("Debe seleccionar una categoría!")
    } else {
      this.catSkillNuevo = this.categorias?.find(categoria => categoria.idCatSkill == this.idCatSkillNueva)
      console.log(this.catSkillNuevo) */

      if (this.categoriaAsignada && this.avanceNuevo) {
        
        const { nombreSkillNuevo, avanceNuevo, categoriaAsignada } = this;
        const nuevaSkill: Skill = { nombreSkill: nombreSkillNuevo, avance: avanceNuevo,
           catSkill: categoriaAsignada };
        this.skillService.createSkill(nuevaSkill).subscribe(data => {

          this.onCreateEvent.emit();
          this.nombreSkillNuevo = "";
          this.avanceNuevo = 0;
          this.idCatSkillNueva = 0;

        }, err => {
          console.error(err);
          alert(this.idiomaEspanol ? "Algo salió mal" : "Something went wrong")
        }
        );

      }
    }
    

  }


