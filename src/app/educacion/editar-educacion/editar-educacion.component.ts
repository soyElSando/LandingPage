import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CategoriaEducacion, CategoriaEducacionWithId } from '../CategoriaEducacion.model';
import { Educacion, EducacionWhitId } from '../Educacion.model';
import { EducacionService } from '../educacion.service';
import I18n from 'src/assets/I18n.json';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/Shared/services/language.service';

@Component({
  selector: 'app-editar-educacion',
  templateUrl: './editar-educacion.component.html',
  styleUrls: ['./editar-educacion.component.css']
})
export class EditarEducacionComponent implements OnInit {

  @Input() educacionAEditar?: Educacion

  institucionEditada: string |undefined = "";
  tituloEsEditado: string  |undefined = "";
  tituloEnEditado: string  |undefined = "";
  categorias: CategoriaEducacionWithId[] | undefined;
  idCatEduEditada: number |undefined = 0;
  logoInstitucionEditado: string |undefined = "";
  descripcionEsEditada: string |undefined  = "";
  descripcionEnEditada: string |undefined  = "";
  inicioEditado: string  |undefined = "";
  finEditado: string |undefined  = "";
  idEduEditado: number |undefined  = 0;
  catEduEditada: CategoriaEducacionWithId = {
    
    "idCatEdu": 0,
    "nombreCatEduEs": "",
    "nombreCatEduEn": "s"

};
  ediciones = I18n.ediciones.educacion
  botones = I18n.boton
  titulo = I18n.seccion.educacion.section.edit
  idiomaEspanol:boolean =true
  esEspanolSub: Subscription = new Subscription;


  @Output() onEditEvent = new EventEmitter();

  constructor(private educacionService: EducacionService, private languageService: LanguageService) { }

  ngOnInit(): void {
    this.educacionService.getCateEducacion().subscribe(data => {    
      this.categorias = data;
  })
  this.esEspanolSub = this.languageService.esEspanol.subscribe((isAuthenticated: boolean)=>{
    this.idiomaEspanol = isAuthenticated
  })
  }

  /* Esta función está para que aparezca el contenido de la educación iterada, porque el componente se crea antes de llegue educacionAEditar */
  ngOnChanges(changes: SimpleChanges) {
    this.idEduEditado = this.educacionAEditar?.idEdu;
    this.institucionEditada = this.educacionAEditar?.institucion;
    this.tituloEsEditado = this.educacionAEditar?.tituloEs;
    this.tituloEnEditado = this.educacionAEditar?.tituloEn;
    this.logoInstitucionEditado = this.educacionAEditar?.logoInstitucion;
    this.inicioEditado = this.educacionAEditar?.inicio;
    this.finEditado = this.educacionAEditar?.fin;
    this.descripcionEsEditada = this.educacionAEditar?.descripcionEs;
    this.descripcionEnEditada = this.educacionAEditar?.descripcionEn;
    this.catEduEditada = this.educacionAEditar?.catEdu || {...this.catEduEditada};

  }

  ngOnDestroy() {
    this.esEspanolSub.unsubscribe();
  }
  onEdit(){

    this.catEduEditada = this.categorias?.find(categoria => categoria.idCatEdu == this.idCatEduEditada)|| {...this.catEduEditada};

    if (this.tituloEsEditado && this.tituloEnEditado && this.institucionEditada && this.logoInstitucionEditado && this.inicioEditado
      && this.finEditado && this.idEduEditado && this.descripcionEsEditada && this.descripcionEnEditada && this.catEduEditada) {
      const { idEduEditado, institucionEditada, tituloEsEditado, tituloEnEditado,logoInstitucionEditado, inicioEditado, finEditado,
        descripcionEsEditada, descripcionEnEditada, catEduEditada } = this
      const educacionEditada: EducacionWhitId = { idEdu: idEduEditado, institucion: institucionEditada, tituloEs: tituloEsEditado,
        tituloEn: tituloEnEditado, logoInstitucion: logoInstitucionEditado, inicio: inicioEditado, fin: finEditado,
        descripcionEs: descripcionEsEditada, descripcionEn: descripcionEnEditada, catEdu: catEduEditada };

      if (educacionEditada !== undefined) {
        this.educacionService.updateEducacion(educacionEditada).subscribe(data => {
          
          this.onEditEvent.emit();
        }, err => { alert(this.idiomaEspanol ? "Algo salió mal" : "Something went wrong") })
      }
      
    } else {
      alert(this.idiomaEspanol ?
         "¡Debe completar todos los campos! No deje vacía la categoría" 
      : "You must complete all fields! Do not leave the category box empty")
    }
  }
}
