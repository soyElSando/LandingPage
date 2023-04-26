import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CategoriaEducacion } from '../CategoriaEducacion.model';
import { Educacion } from '../Educacion.model';
import { EducacionService } from '../educacion.service';

@Component({
  selector: 'app-educacion-nueva',
  templateUrl: './educacion-nueva.component.html',
  styleUrls: ['./educacion-nueva.component.css']
})
export class EducacionNuevaComponent implements OnInit {

  institucionNueva: String = "";
  tituloNuevo: String = "";
  logoInstitucionNuevo: String = "";
  inicioNuevo: String = "";
  finNuevo: String = "";
  descripcionNueva: String = "";
  catEduNueva: number | undefined = 0;
  categorias: CategoriaEducacion[] | undefined
  idCatEduNueva: number = 0;
  nombreCatEduAsignada?: String

  @Input() catEduAsignada?: number

  @Output() onCreateEvent = new EventEmitter();

  constructor(private educacionService: EducacionService) { }

  ngOnInit(): void {
    this.educacionService.getCateEducacion().subscribe(data => {
      this.categorias = data;
    })
  }

  onCreate() {
    
      this.catEduNueva = this.categorias?.find(categoria => categoria.idCatEdu == this.idCatEduNueva)?.idCatEdu

      if (this.catEduAsignada) {
        const { institucionNueva, tituloNuevo, logoInstitucionNuevo, inicioNuevo, finNuevo, descripcionNueva, catEduAsignada } = this;
        const nuevaEducacion: Educacion = { institucion: institucionNueva, titulo: tituloNuevo, logoInstitucion: logoInstitucionNuevo, inicio: inicioNuevo, fin: finNuevo, descripcion: descripcionNueva, catEdu: catEduAsignada };

        this.educacionService.createEducacion(nuevaEducacion).subscribe(data => {

          this.onCreateEvent.emit();
          this.institucionNueva = "";
          this.tituloNuevo = "";
          this.logoInstitucionNuevo = "";
          this.inicioNuevo = "";
          this.finNuevo = "";
          this.descripcionNueva = "";
          this.idCatEduNueva = 0;
        }, err => {
          alert("Algo salió mal")
        }
        );

      
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.nombreCatEduAsignada = this.categorias?.find(item=>item.idCatEdu==this.catEduAsignada)?.nombreCatEdu;
  
  }
}


