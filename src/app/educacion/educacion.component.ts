import { Component, OnInit } from '@angular/core';
import { CategoriaEducacion } from './CategoriaEducacion.model';
import { Educacion } from './Educacion.model';
import { LoginService } from 'src/app/Shared/services/login.service';
import { EducacionService } from './educacion.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  educaciones: Educacion[]= [];
  categorias: CategoriaEducacion[] = [];
  educacionesFiltradas: Educacion[] = [];
  educacionActual?: Educacion;
  idCatEduActual?: number;

  constructor(private educacionService: EducacionService, private autenticacionService: LoginService) { }

  ngOnInit(): void {

      this.educacionService.getEducaciones().subscribe(data => {    
      this.educaciones = data;
      
  } );

      this.educacionService.getCateEducacion().subscribe(data => {    
      this.categorias = data;
      
  } );

  }

  public filtrarPorCategoria(id: number): Educacion[]{
    this.educacionesFiltradas = this.educaciones.filter(educacion => educacion.catEdu==id)
    return this.educacionesFiltradas;


  }

  renderizar(){
    this.educacionService.getEducaciones().subscribe(data => {    
      this.educaciones = data;      
    } );

    this.educacionService.getCateEducacion().subscribe(data => {    
      this.categorias = data;   
    } );

  }

  guardarEducacion(edu: Educacion) {
    this.educacionActual=edu;

  }
  estaLogueado(){
    return this.autenticacionService.isLoggedIn();
}

guardarCategoriaEdu (catEdu: CategoriaEducacion){
  this.idCatEduActual = catEdu.idCatEdu;
}

}
