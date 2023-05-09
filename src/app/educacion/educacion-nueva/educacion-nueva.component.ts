import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CategoriaEducacion, CategoriaEducacionWithId } from '../CategoriaEducacion.model';
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

  institucionNueva: string = "";
  tituloEsNuevo: string = "";
  tituloEnNuevo: string = "";
  logoInstitucionNuevo: string = "";
  inicioNuevo: string = "";
  finNuevo: string = "";
  descripcionEsNueva: string = "";
  descripcionEnNueva: string = "";
  catEduNueva: CategoriaEducacion | undefined;
  categorias: CategoriaEducacionWithId[] | undefined
  idCatEduNueva: number = 0;
  catAsignada: CategoriaEducacionWithId={
    
      "idCatEdu": 0,
      "nombreCatEduEs": "",
      "nombreCatEduEn": ""
  
  };

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
      
      this.catAsignada = data.find(categoria => categoria.idCatEdu == this.catEduAsignada) || {...this.catAsignada}
    })

    this.esEspanolSub = this.languageService.esEspanol.subscribe((isAuthenticated: boolean)=>{
      this.idiomaEspanol = isAuthenticated
    })
  }

  ngOnDestroy() {
    this.esEspanolSub.unsubscribe();
  }

  onCreate() {
      const inicio = new Date(this.inicioNuevo);
      const fin = new Date(this.finNuevo);
      if (this.finNuevo.length > 0 && fin < inicio) {
        alert(this.idiomaEspanol ?
          "La fecha de fin no puede ser anterior a la fecha de inicio"
          : "End date cannot be before start date");
        return;
      }
      this.catEduNueva = this.categorias?.find(categoria => categoria.idCatEdu == this.idCatEduNueva)

      if (this.catEduAsignada) {
        const { institucionNueva, tituloEsNuevo, tituloEnNuevo,logoInstitucionNuevo, inicioNuevo, finNuevo, descripcionEsNueva,
           descripcionEnNueva,catAsignada } = this;
        const nuevaEducacion: Educacion = { institucion: institucionNueva, tituloEs: tituloEsNuevo, tituloEn: tituloEnNuevo,
          logoInstitucion: logoInstitucionNuevo, inicio: inicioNuevo, fin: finNuevo, descripcionEs: descripcionEsNueva,
          descripcionEn: descripcionEnNueva, catEdu: catAsignada };

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


