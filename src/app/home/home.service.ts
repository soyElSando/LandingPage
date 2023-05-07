import { Injectable } from '@angular/core';
import { Carrousel, CarrouselWithId } from '../models/Carrousel.model';
import home from 'src/assets/mockBD/home.json'
import { Observable, Subscription, of, throwError } from 'rxjs';
import I18N from 'src/assets/I18n.json'
import { LanguageService } from '../Shared/services/language.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


export class HomeService {

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
  
  
  public getName():any{
    return I18N.carrousel.promos
  }

  //implementacion con mockBD

  getElements(): Observable<Carrousel[]> {
    return of(home.promos);
  }

  createElemento(elemento: Carrousel): Observable<any> {
    const newId = home.promos.length + 1;
    const newElemento = { id: newId, ...elemento };
    home.promos.push(newElemento);
    return of(newElemento);
  }

  deleteElemento(id: number): Observable<void> {
    const index = home.promos.findIndex(e => e.id === id);
    if (index >= 0) {
      home.promos.splice(index, 1);
      return of(undefined);
    } else {
      return throwError('Element not found');
    }
  }

  editElemento(elemento:CarrouselWithId): Observable<any> {
    const index = home.promos.findIndex(e => e.id === elemento.id);
    if (index >= 0) {
      const updatedElemento = { ...elemento };
      home.promos[index] = updatedElemento;
      return of(updatedElemento);
    } else {
      return throwError('Element not found');
    }
  }

  //implementacion con Backend

/*   
  public getElements(): Observable<Carrrousel[]>{
    return this.http.get<Carrousel[]>( this.apiServerUrl + '/Home/todos');
  }

  public updateElemento(home: CarrouselWithId): Observable<any>{

    return this.http.put<Carrousel>(`${this.apiServerUrl}/Home/editar`, home);
  } 

  public createElemento(home: Carrousel): Observable<any>{
    return this.http.post<Carrousel>(this.apiServerUrl + '/Home/agregar', home);
  }

  public deleteElemento(id: number): Observable<void>{
    return this.http.delete<void>(this.apiServerUrl + '/Home/eliminar/' + id);
  }
  
  private handleError(error: any) {
    console.error(error);
    return throwError(this.idiomaEspanol ? I18N.error.request.es : I18N.error.request.en);
  } 
  */

}
