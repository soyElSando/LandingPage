import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoriaEducacion, CategoriaEducacionWithId } from './CategoriaEducacion.model';
import { Educacion, EducacionWhitId} from './Educacion.model';
import educacion from 'src/assets/mockBD/educacion.json'
import categoriaEducacion from 'src/assets/mockBD/categoriaEducacion.json'
import I18N from 'src/assets/I18n.json'
import { LanguageService } from '../Shared/services/language.service';

@Injectable({
  providedIn: 'root'
})

export class EducacionService {

  private apiUrl = environment.apiBaseUrl;
  esEspanolSub: Subscription = new Subscription;

  constructor(/* private http: HttpClient, */ private languageService: LanguageService) { } 
  idiomaEspanol:boolean =true

  ngOnInit() {
    this.esEspanolSub = this.languageService.esEspanol.subscribe((isAuthenticated: boolean)=>{
      this.idiomaEspanol = isAuthenticated
    })
  }

  ngOnDestroy() {
    this.esEspanolSub.unsubscribe();
  }

  //Implementacion con MockBD
  public getEducaciones(): Observable<EducacionWhitId[]>{
    return of(educacion.educacion);
  }

  public updateEducacion(edu: EducacionWhitId): Observable<any>{

    const index = educacion.educacion.findIndex(e => e.idEdu === edu.idEdu);
    if (index >= 0) {
      const updatedElemento = { ...edu };
      educacion.educacion[index] = updatedElemento;
      return of(updatedElemento);
    } else {
      return throwError('Element not found');
    }
  } 

  public createEducacion(edu: Educacion): Observable<any>{
    const newId = educacion.educacion.length + 1;
    const newElemento:EducacionWhitId = { idEdu: newId, ...edu };
    educacion.educacion.push(newElemento);
    return of(newElemento);
  }

  public deleteEducacion(id: number): Observable<void>{
    const index = educacion.educacion.findIndex(e => e.idEdu === id);
    if (index >= 0) {
      educacion.educacion.splice(index, 1);
      return of(undefined);
    } else {
      return throwError('Element not found');
    }
  }

  
  public getCateEducacion(): Observable<CategoriaEducacionWithId[]>{

    return of(categoriaEducacion.categoriaEducacion);
  }

  // Metodos para las categorias de Educacion no implementdos
  /* public updateCateEducacion(cateEdu: CategoriaEducacion): Observable<any>{
    return of(categoriaEducacion.categoriaEducacion);
  } 

  public createCateEducacion(cateEdu: CategoriaEducacion): Observable<any>{
    return of(categoriaEducacion.categoriaEducacion);
  }

  public deleteCateEducacion(id: number): Observable<void>{
    return of(undefined);
  } */

}

//IMPLEMENTACION CON BACKEND
/* 
  public getEducaciones(): Observable<EducacionWithId[]>{
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
  
  public getCateEducacion(): Observable<CategoriaEducacionWithId[]>{
    return this.http.get<CategoriaEducacion[]>( this.apiServerUrl + '/CategoriasEducacion/todos');
  }

  // Metodos para las categorias de Educacion no implementados
  public updateCateEducacion(cateEdu: CategoriaEducacion): Observable<any>{

    return this.http.put<CategoriaEducacion>(`${this.apiServerUrl}/CategoriasEducacion/editar`, cateEdu);
  } 

  public createCateEducacion(cateEdu: CategoriaEducacion): Observable<any>{
    return this.http.post<CategoriaEducacion>(this.apiServerUrl + '/CategoriasEducacion/agregar', cateEdu);
  }

  public deleteCateEducacion(id: number): Observable<void>{
    return this.http.delete<void>(this.apiServerUrl + '/CategoriasEducacion/eliminar/' + id);
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(this.idiomaEspanol ? I18N.error.request.es : I18N.error.request.en);
  } 
}
 */