import { Injectable } from '@angular/core';
import { Carrousel, CarrouselWithId } from '../models/Carrousel.model';
import proyectos from 'src/assets/mockBD/proyectos.json'
import { Observable, Subscription, of, throwError } from 'rxjs';
import I18N from 'src/assets/I18n.json'
import { LanguageService } from '../Shared/services/language.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


export class ProyectosService {

  private apiUrl = environment.apiBaseUrl+'/api/proyectos';
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

  public getName():any{
    return I18N.carrousel.proyectos
  }

  //implementacion con MockBD
  
  public getElements():Observable<Carrousel[]>{
    return of(proyectos.proyectos)
  }

  createElemento(elemento: Carrousel): Observable<any> {
    const newId = proyectos.proyectos.length + 1;
    const newElemento = { id: newId, ...elemento };
    proyectos.proyectos.push(newElemento);
    return of(newElemento);
  }

  deleteElemento(id: number): Observable<void> {
    const index = proyectos.proyectos.findIndex(e => e.id === id);
    if (index >= 0) {
      proyectos.proyectos.splice(index, 1);
      return of(undefined);
    } else {
      return throwError('Element not found');
    }
  }

  editElemento(elemento:CarrouselWithId): Observable<any> {
    const index = proyectos.proyectos.findIndex(e => e.id === elemento.id);
    if (index >= 0) {
      const updatedElemento = { ...elemento };
      proyectos.proyectos[index] = updatedElemento;
      return of(updatedElemento);
    } else {
      return throwError('Element not found');
    }
  }

  //implementacion con Backend

/* 
  public getProyectos(): Observable<Carrrousel[]>{
    return this.http.get<Carrousel[]>( this.apiServerUrl + '/Proyectos/todos');
  }

  public updateProyecto(proyecto: CarrouselWithId): Observable<any>{

    return this.http.put<Carrousel>(`${this.apiServerUrl}/Proyectos/editar`, proyecto);
  } 

  public createProyecto(proyecto: Carrousel): Observable<any>{
    return this.http.post<Carrousel>(this.apiServerUrl + '/Proyectos/agregar', proyecto);
  }

  public deleteProyecto(id: number): Observable<void>{
    return this.http.delete<void>(this.apiServerUrl + '/Proyectos/eliminar/' + id);
  }
  
  private handleError(error: any) {
    console.error(error);
    return throwError(this.idiomaEspanol ? I18N.error.request.es : I18N.error.request.en);
  } 
  */
}
