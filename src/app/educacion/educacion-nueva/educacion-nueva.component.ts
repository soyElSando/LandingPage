import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CategoriaEducacion } from '../CategoriaEducacion.model';
import { Educacion } from '../Educacion.model';
import { EducacionService } from '../educacion.service';
import I18n from 'src/assets/I18n.json';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/Shared/services/language.service';

@Component({
  selector: 'app-educacion-nueva',
  templateUrl: './educacion-nueva.component.html',
  styleUrls: ['./educacion-nueva.component.css']
})
export class EducacionNuevaComponent implements OnInit {

  institucionNueva: String = "";
  tituloEsNuevo: String = "";
  tituloEnNuevo: String = "";
  logoInstitucionNuevo: String = "";
  inicioNuevo: String = "";
  finNuevo: String = "";
  descripcionEsNueva: String = "";
  descripcionEnNueva: String = "";
  catEduNueva: number | undefined = 0;
  categorias: CategoriaEducacion[] | undefined
  idCatEduNueva: number = 0;
  catAsignada: CategoriaEducacion ={
    "idCatEdu": 1,
    "nombreCatEdu": {
        "es": "Certificaciones",
        "en": "Courses"
    }
  }

  ediciones = I18n.ediciones.educacion
  botones = I18n.boton
  titulo = I18n.seccion.educacion.section.new
  idiomaEspanol:boolean =true
  esEspanolSub: Subscription = new Subscription;

  @Input() catEduAsignada?: number

  @Output() onCreateEvent = new EventEmitter();

  constructor(private educacionService: EducacionService, private languageService: LanguageService) { }

  ngOnInit(): void {
    this.educacionService.getCateEducacion().subscribe(data => {
      this.categorias = data;
    })

    this.esEspanolSub = this.languageService.esEspanol.subscribe((isAuthenticated: boolean)=>{
      this.idiomaEspanol = isAuthenticated
    })
  }

  ngOnDestroy() {
    this.esEspanolSub.unsubscribe();
  }

  onCreate() {
    
      this.catEduNueva = this.categorias?.find(categoria => categoria.idCatEdu == this.idCatEduNueva)?.idCatEdu

      if (this.catEduAsignada) {
        const { institucionNueva, tituloEsNuevo, tituloEnNuevo,logoInstitucionNuevo, inicioNuevo, finNuevo, descripcionEsNueva,
           descripcionEnNueva,catEduAsignada } = this;
        const nuevaEducacion: Educacion = { institucion: institucionNueva, tituloEs: tituloEsNuevo, tituloEn: tituloEnNuevo,
          logoInstitucion: logoInstitucionNuevo, inicio: inicioNuevo, fin: finNuevo, descripcionEs: descripcionEsNueva,
          descripcionEn: descripcionEnNueva, catEdu: catEduAsignada };

        this.educacionService.createEducacion(nuevaEducacion).subscribe(data => {

          this.onCreateEvent.emit();
          this.institucionNueva = "";
          this.tituloEsNuevo = "";
          this.tituloEnNuevo = "";
          this.logoInstitucionNuevo = "";
          this.inicioNuevo = "";
          this.finNuevo = "";
          this.descripcionEsNueva = "";
          this.descripcionEnNueva = "";
          this.idCatEduNueva = 0;
        }, err => {
          alert(this.idiomaEspanol ? "Algo salió mal" : "Something went wrong")
        }
        );

      
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    let x = this.categorias?.find(item=>item.idCatEdu==this.catEduAsignada)
    if(x){
    this.catAsignada = x;
    }
  }
}


