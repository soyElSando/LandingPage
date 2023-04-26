import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CategoriaEducacion } from '../CategoriaEducacion.model';
import { Educacion } from '../Educacion.model';
import { EducacionService } from '../educacion.service';

@Component({
  selector: 'app-editar-educacion',
  templateUrl: './editar-educacion.component.html',
  styleUrls: ['./editar-educacion.component.css']
})
export class EditarEducacionComponent implements OnInit {

  @Input() educacionAEditar?: Educacion

  institucionEditada: String |undefined = "";
  tituloEditado: String  |undefined = "";
  categorias: CategoriaEducacion[] | undefined;
  idCatEduEditada: number |undefined = 0;
  logoInstitucionEditado: String |undefined = "";
  descripcionEditada: String |undefined  = "";
  inicioEditado: String  |undefined = "";
  finEditado: String |undefined  = "";
  idEduEditado: number |undefined  = 0;
  catEduEditada: number | undefined = 0;

  @Output() onEditEvent = new EventEmitter();

  constructor(private educacionService: EducacionService) { }

  ngOnInit(): void {
    this.educacionService.getCateEducacion().subscribe(data => {    
      this.categorias = data;
  })
}

/* Esta función está para que aparezca el contenido de la educación iterada, porque el componente se crea antes de llegue educacionAEditar */
ngOnChanges(changes: SimpleChanges) {
  this.idEduEditado = this.educacionAEditar?.idEdu;
  this.institucionEditada = this.educacionAEditar?.institucion;
  this.tituloEditado = this.educacionAEditar?.titulo;
  this.logoInstitucionEditado = this.educacionAEditar?.logoInstitucion;
  this.inicioEditado = this.educacionAEditar?.inicio;
  this.finEditado = this.educacionAEditar?.fin;
  this.descripcionEditada = this.educacionAEditar?.descripcion;
  this.catEduEditada = this.educacionAEditar?.catEdu;

}


  onEdit(){

    this.catEduEditada = this.categorias?.find(categoria => categoria.idCatEdu == this.idCatEduEditada)?.idCatEdu

    if (this.tituloEditado && this.institucionEditada && this.logoInstitucionEditado && this.inicioEditado && this.finEditado && this.idEduEditado && this.descripcionEditada && this.catEduEditada) {
      const { idEduEditado, institucionEditada, tituloEditado, logoInstitucionEditado, inicioEditado, finEditado, descripcionEditada, catEduEditada } = this
      const educacionEditada: Educacion = { idEdu: idEduEditado, institucion: institucionEditada, titulo: tituloEditado, logoInstitucion: logoInstitucionEditado, inicio: inicioEditado, fin: finEditado, descripcion: descripcionEditada, catEdu: catEduEditada };

      if (educacionEditada !== undefined) {
        this.educacionService.updateEducacion(educacionEditada).subscribe(data => {
          
          this.onEditEvent.emit();
        }, err => { alert("Algo salió mal") })

      }

    }

  }

}
