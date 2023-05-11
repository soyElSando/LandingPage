import { Injectable } from '@angular/core';
import { Carrousel, CarrouselWithId } from '../Shared/models/Carrousel.model';
import proyectos from 'src/assets/mockBD/proyectos.json'
import { Observable, Subscription, of, throwError } from 'rxjs';
import I18N from 'src/assets/I18n.json'
import { LanguageService } from '../Shared/services/language.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class ProyectosService {
  
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

  public getName():any{
    return I18N.carrousel.proyectos
  }

  public getElements():Observable<Carrousel[]>{
    if (this.useMock) {
      return of(proyectos.proyectos)
    } else {
      return this.http.get<Carrousel[]>( this.apiUrl + '/Proyectos/todos');
    }  
  }

  createElemento(elemento: Carrousel): Observable<any> {
    if (this.useMock) {
      const newId = proyectos.proyectos.length + 1;
      const newElemento = { id: newId, ...elemento };
      proyectos.proyectos.push(newElemento);
      return of(newElemento);
    } else {
      return this.http.post<Carrousel>(this.apiUrl + '/Proyectos/agregar', elemento);
    }
  }

  deleteElemento(id: number): Observable<void> {
    if (this.useMock) {
      const index = proyectos.proyectos.findIndex(e => e.id == id);
      if (index >= 0) {
        proyectos.proyectos.splice(index, 1);
        return of(undefined);
      } else {
        return throwError(this.idiomaEspanol ? I18N.error.request.es : I18N.error.request.en);
      }
    } else {
      return this.http.delete<void>(this.apiUrl + '/Proyectos/eliminar/' + id);
    }
    /* console.log(id)
    if (this.useMock) {
      console.log(proyectos.proyectos)
      const proyectoAEliminar = proyectos.proyectos.find(e => e.id == id);
      console.log(proyectoAEliminar?.id);
      if (proyectoAEliminar) {
        proyectos.proyectos = proyectos.proyectos.filter(e => e.id != id);
        return of(undefined);
      } else {
        return throwError(this.idiomaEspanol ? I18N.error.request.es : I18N.error.request.en);
      }
    } else {
      return this.http.delete<void>(this.apiUrl + '/Proyectos/eliminar/' + id);
    } */
  }

  editElemento(elemento:CarrouselWithId): Observable<any> {
    if (this.useMock) {
      const index = proyectos.proyectos.findIndex(e => e.id === elemento.id);
      if (index >= 0) {
        const updatedElemento = { ...elemento };
        proyectos.proyectos[index] = updatedElemento;
        return of(updatedElemento);
      } else {
        return throwError(this.idiomaEspanol ? I18N.error.request.es : I18N.error.request.en);
      }
    } else {
      return this.http.put<Carrousel>(`${this.apiUrl}/Proyectos/editar`, elemento);
    }
  }
}
