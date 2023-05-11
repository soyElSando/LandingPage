import { Injectable } from '@angular/core';
import { Carrousel, CarrouselWithId } from '../Shared/models/Carrousel.model';
import home from 'src/assets/mockBD/home.json'
import { Observable, Subscription, of, throwError } from 'rxjs';
import I18N from 'src/assets/I18n.json'
import { LanguageService } from '../Shared/services/language.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class HomeService {
  
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
    return I18N.carrousel.promos
  }

  getElements(): Observable<Carrousel[]> {
    if (this.useMock) {
      return of(home.promos);
    }else{
      return this.http.get<Carrousel[]>( this.apiUrl + '/Home/todos');
    }

  }

  createElemento(elemento: Carrousel): Observable<any> {
    if (this.useMock) {
      const newId = home.promos.length + 1;
      const newElemento = { id: newId, ...elemento };
      home.promos.push(newElemento);
      return of(newElemento);
    }else{
      return this.http.post<Carrousel>(this.apiUrl + '/Home/agregar', elemento);
    }
  }

  deleteElemento(id: number): Observable<void> {
    if (this.useMock) {
      const index = home.promos.findIndex(e => e.id == id);
      if (index >= 0) {
        home.promos.splice(index, 1);
        return of(undefined);
      } else {
        return throwError(this.idiomaEspanol ? I18N.error.request.es : I18N.error.request.en);
      }
    }else{
      return this.http.delete<void>(this.apiUrl + '/Home/eliminar/' + id);
    }

  }

  editElemento(elemento:CarrouselWithId): Observable<any> {
    if (this.useMock) {
      const index = home.promos.findIndex(e => e.id === elemento.id);
      if (index >= 0) {
        const updatedElemento = { ...elemento };
        home.promos[index] = updatedElemento;
        return of(updatedElemento);
      } else {
        return throwError(this.idiomaEspanol ? I18N.error.request.es : I18N.error.request.en);
      }
    } else {
      return this.http.put<Carrousel>(`${this.apiUrl}/Home/editar`, elemento);
    }
  }

}
