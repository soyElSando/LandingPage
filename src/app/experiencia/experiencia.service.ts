import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Experiencia, ExperienciaWithId } from './Experiencia.model';
import experiencia from 'src/assets/mockBD/experiencia.json'
import I18N from 'src/assets/I18n.json'
import { LanguageService } from '../Shared/services/language.service';

@Injectable({
  providedIn: 'root'
})

//implementacion con mockBD
export class ExperienciaService {

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

  //Implementacion con MockDB
  public getExperiencias():Observable<Experiencia[]>{
    return of(experiencia.experiencia)
  }

  public updateExperiencia(expLab: ExperienciaWithId):Observable<Experiencia>{
    const index = experiencia.experiencia.findIndex(e => e.idExp === expLab.idExp);
    if (index >= 0) {
      const updatedElemento = { ...expLab };
      experiencia.experiencia[index] = updatedElemento;
      return of(updatedElemento);
    } else {
      return throwError('Element not found');
    }
  }
  public deleteExperiencia(id: number):Observable<void>{
    const index = experiencia.experiencia.findIndex(e => e.idExp === id);
    if (index >= 0) {
      experiencia.experiencia.splice(index, 1);
      return of(undefined);
    } else {
      return throwError('Element not found');
    }
  }
  public createExperiencia(expLab: Experiencia):Observable<any>{
    const newId = experiencia.experiencia.length + 1;
    const newElemento = { idExp: newId, ...expLab };
    experiencia.experiencia.push(newElemento);
    return of(newElemento);
  }
}

//implementacion con backend
/* 
  public getExperiencias(): Observable<Experiencia[]>{
    return this.http.get<Experiencia[]>( this.apiServerUrl + '/Experiencia/todos');
  }

  public updateExperiencia(expLab: Experiencia): Observable<any>{

    return this.http.put<Experiencia>(`${this.apiServerUrl}/Experiencia/editar`, expLab);
  } 

  public createExperiencia(expLab: Experiencia): Observable<any>{
    return this.http.post<Experiencia>(this.apiServerUrl + '/Experiencia/agregar', expLab);
  }

  public deleteExperiencia(id: number): Observable<void>{
    return this.http.delete<void>(this.apiServerUrl + '/Experiencia/eliminar/' + id);
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(this.idiomaEspanol ? I18N.error.request.es : I18N.error.request.en);
  } 
}
 */