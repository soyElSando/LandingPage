import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subscription, of, throwError } from 'rxjs';
import sobreMi from 'src/assets/mockBD/sobreMi.json';
import { SobreMi } from './SobreMi.model';
import { environment } from 'src/environments/environment';
import { LanguageService } from '../Shared/services/language.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

//implementacion con mockBD
export class SobreMiService {

  private useMock = environment.mockDB;
  private apiUrl = environment.apiBaseUrl+'/api/sobreMi';
  esEspanolSub: Subscription = new Subscription;

  constructor(private http: HttpClient, private languageService: LanguageService) {   } 
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

  public getSobreMi():Observable<SobreMi>{
    if (this.useMock) {
      return of(sobreMi);
    } else {
      return this.http.get<SobreMi>( this.apiUrl + '/usuario/id/12');
    }
  }

  public updateSobreMi(updatedElemento:SobreMi):Observable<SobreMi>{
    if (this.useMock) {
      this.onEditEvent.emit();
      return of(updatedElemento); 
    } else {
      return this.http.put<SobreMi>(`${this.apiUrl}/usuario/editar`, updatedElemento);
    }
  }

  getOnEditEvent(): Observable<any> {
    return this.onEditEvent.asObservable();
  }
}