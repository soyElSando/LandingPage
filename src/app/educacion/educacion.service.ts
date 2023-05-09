import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoriaEducacionWithId } from './CategoriaEducacion.model';
import { Educacion, EducacionWithId} from './Educacion.model';
import educacion from 'src/assets/mockBD/educacion.json'
import categoriaEducacion from 'src/assets/mockBD/categoriaEducacion.json'
import I18N from 'src/assets/I18n.json'
import { LanguageService } from '../Shared/services/language.service';

@Injectable({
  providedIn: 'root'
})

export class EducacionService {

  private useMock = environment.mockDB;
  private apiUrl = environment.apiBaseUrl;
  esEspanolSub: Subscription = new Subscription;

  constructor( private http: HttpClient,  private languageService: LanguageService) { } 
  idiomaEspanol:boolean =true

  ngOnInit() {
    this.esEspanolSub = this.languageService.esEspanol.subscribe((isAuthenticated: boolean)=>{
      this.idiomaEspanol = isAuthenticated
    })
  }

  ngOnDestroy() {
    this.esEspanolSub.unsubscribe();
  }

  public getEducaciones(): Observable<EducacionWithId[]>{
    if (this.useMock) {
      return of(educacion.educacion);
    } else {
      return this.http.get<EducacionWithId[]>( this.apiUrl + '/Educacion/todos');
    }
  }

  public updateEducacion(edu: EducacionWithId): Observable<any>{
    if (this.useMock) {
      const index = educacion.educacion.findIndex(e => e.idEdu === edu.idEdu);
      if (index >= 0) {
        const updatedElemento = { ...edu };
        educacion.educacion[index] = updatedElemento;
        return of(updatedElemento);
      } else {
        return throwError(this.idiomaEspanol ? I18N.error.request.es : I18N.error.request.en);
      }
    } else {
      return this.http.put<EducacionWithId>(`${this.apiUrl}/Educacion/editar`, edu);
    }
  } 

  public createEducacion(edu: Educacion): Observable<any>{
    if (this.useMock) {
      const newId = educacion.educacion.length + 1;
      const newElemento:EducacionWithId = { idEdu: newId, ...edu };
      educacion.educacion.push(newElemento);
      return of(newElemento);
    } else {
      return this.http.post<Educacion>(this.apiUrl + '/Educacion/agregar', edu);
    }
  }

  public deleteEducacion(id: number): Observable<void>{
    if (this.useMock) {
      const index = educacion.educacion.findIndex(e => e.idEdu === id);
      if (index >= 0) {
        educacion.educacion.splice(index, 1);
        return of(undefined);
      } else {
        return throwError(this.idiomaEspanol ? I18N.error.request.es : I18N.error.request.en);
      }
    } else {
      return this.http.delete<void>(this.apiUrl + '/Educacion/eliminar/' + id);
    }
  }

  
  public getCateEducacion(): Observable<CategoriaEducacionWithId[]>{
    if (this.useMock) {
      return of(categoriaEducacion.categoriaEducacion);
    } else {
      return this.http.get<CategoriaEducacionWithId[]>( this.apiUrl + '/CategoriasEducacion/todos');
    }
  }

}

  // Metodos para las categorias de Educacion no implementdos para Mock
  /* public updateCateEducacion(cateEdu: CategoriaEducacion): Observable<any>{
    return of(categoriaEducacion.categoriaEducacion);
  } 

  public createCateEducacion(cateEdu: CategoriaEducacion): Observable<any>{
    return of(categoriaEducacion.categoriaEducacion);
  }

  public deleteCateEducacion(id: number): Observable<void>{
    return of(undefined);
  } */

  // Metodos para las categorias de Educacion no implementados para backend
  /* public updateCateEducacion(cateEdu: CategoriaEducacion): Observable<any>{

    return this.http.put<CategoriaEducacion>(`${this.apiServerUrl}/CategoriasEducacion/editar`, cateEdu);
  } 

  public createCateEducacion(cateEdu: CategoriaEducacion): Observable<any>{
    return this.http.post<CategoriaEducacion>(this.apiServerUrl + '/CategoriasEducacion/agregar', cateEdu);
  }

  public deleteCateEducacion(id: number): Observable<void>{
    return this.http.delete<void>(this.apiServerUrl + '/CategoriasEducacion/eliminar/' + id);
  } */
