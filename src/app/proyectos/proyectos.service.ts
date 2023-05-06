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

/*   getElements(): Observable<Carrousel[]> {
    return this.http.get<Carrousel[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  createElemento(elemento: Carrousel): Observable<Carrousel> {
    return this.http.post<Carrousel>(this.apiUrl, elemento)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteElemento(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url)
      .pipe(
        map(() => {}),
        catchError(this.handleError)
      );
  }

  editElemento(elemento: CarrouselWithId): Observable<Carrousel> {
    const url = `${this.apiUrl}/${elemento.id}`;
    return this.http.put<Carrousel>(url, elemento)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  private handleError(error: any) {
    console.error(error);
    return throwError(this.idiomaEspanol ? I18N.error.request.es : I18N.error.request.en);
  } 
  */
}
