import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import sobreMi from 'src/assets/mockBD/sobreMi.json';
import { SobreMi } from '../models/SobreMi.model';
import { environment } from 'src/environments/environment';
import { LanguageService } from '../Shared/services/language.service';

@Injectable({
  providedIn: 'root'
})

//implementacion con mockBD
export class SobreMiService {

  private apiUrl = environment.apiBaseUrl+'/api/sobreMi';
  esEspanolSub: Subscription = new Subscription;

  constructor(/* private http: HttpClient, */ private languageService: LanguageService) { } 
  idiomaEspanol:boolean =true
  private onEditEvent: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.esEspanolSub = this.languageService.esEspanol.subscribe((isAuthenticated: boolean)=>{
      this.idiomaEspanol = isAuthenticated
    })
  }

  ngOnDestroy() {
    this.esEspanolSub.unsubscribe();
  }

  //Implementacion con MockDB
  private data:SobreMi = sobreMi;
  

  public getSobreMi():Observable<SobreMi>{
    return of(this.data)
  }

  public updateSobreMi(updatedElemento:SobreMi):Observable<SobreMi>{
    this.onEditEvent.emit();
    this.data = updatedElemento;
    return of(updatedElemento); 
  }

  getOnEditEvent(): Observable<any> {
    return this.onEditEvent.asObservable();
  }

  //implementacion con backend
/* 
  public getSobreMi(): Observable<SobreMi>{
    return this.http.get<SobreMi>( this.apiServerUrl + '/SobreMi/');
  }

  public updateExperiencia(expLab: SobreMi): Observable<SobreMi>{

    return this.http.put<SobreMi>(`${this.apiServerUrl}/SobreMi/editar`, expLab);
  } 

  private handleError(error: any) {
    console.error(error);
    return throwError(this.idiomaEspanol ? I18N.error.request.es : I18N.error.request.en);
  } 
}
 */
}