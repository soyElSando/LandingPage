import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoriaEducacion } from './CategoriaEducacion.model';
import { Educacion } from './Educacion.model';
import educacion from 'src/assets/mockBD/educacion.json'
import categoriaEducacion from 'src/assets/mockBD/categoriaEducacion.json'

@Injectable({
  providedIn: 'root'
})

//IMPLEMENTACION CON MOCKBD
export class EducacionService {

  public getEducaciones(): Observable<Educacion[]>{
    return of(educacion.educacion);
  }

  public updateEducacion(edu: Educacion): Observable<any>{

    return of(educacion.educacion);
  } 

  public createEducacion(edu: Educacion): Observable<any>{
    return of(educacion.educacion);
  }

  public deleteEducacion(id: number): Observable<void>{
    return of(undefined);
  }

  // Metodos para las categorias de Educacion
  public getCateEducacion(): Observable<CategoriaEducacion[]>{

    return of(categoriaEducacion.categoriaEducacion);
  }

  public updateCateEducacion(cateEdu: CategoriaEducacion): Observable<any>{
    return of(categoriaEducacion.categoriaEducacion);
  } 

  public createCateEducacion(cateEdu: CategoriaEducacion): Observable<any>{
    return of(categoriaEducacion.categoriaEducacion);
  }

  public deleteCateEducacion(id: number): Observable<void>{
    return of(undefined);
  }

}

//IMPLEMENTACION CON BACKEND
/* export class EducacionService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getEducaciones(): Observable<Educacion[]>{
    return this.http.get<Educacion[]>( this.apiServerUrl + '/Educacion/todos');
  }

  public updateEducacion(edu: Educacion): Observable<any>{

    return this.http.put<Educacion>(`${this.apiServerUrl}/Educacion/editar`, edu);
  } 

  public createEducacion(edu: Educacion): Observable<any>{
    return this.http.post<Educacion>(this.apiServerUrl + '/Educacion/agregar', edu);
  }

  public deleteEducacion(id: number): Observable<void>{
    return this.http.delete<void>(this.apiServerUrl + '/Educacion/eliminar/' + id);
  }

  // Metodos para las categorias de Educacion
  public getCateEducacion(): Observable<CategoriaEducacion[]>{
    return this.http.get<CategoriaEducacion[]>( this.apiServerUrl + '/CategoriasEducacion/todos');
  }

  public updateCateEducacion(cateEdu: CategoriaEducacion): Observable<any>{

    return this.http.put<CategoriaEducacion>(`${this.apiServerUrl}/CategoriasEducacion/editar`, cateEdu);
  } 

  public createCateEducacion(cateEdu: CategoriaEducacion): Observable<any>{
    return this.http.post<CategoriaEducacion>(this.apiServerUrl + '/CategoriasEducacion/agregar', cateEdu);
  }

  public deleteCateEducacion(id: number): Observable<void>{
    return this.http.delete<void>(this.apiServerUrl + '/CategoriasEducacion/eliminar/' + id);
  }

}
 */