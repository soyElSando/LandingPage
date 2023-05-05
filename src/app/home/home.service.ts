import { Injectable } from '@angular/core';
import { Carrousel } from '../models/Carrousel.model';
import home from 'src/assets/mockBD/home.json'
import { Observable, of } from 'rxjs';
import I18N from 'src/assets/I18n.json'

@Injectable({
  providedIn: 'root'
})

//implementacion con mockBD
export class HomeService {
  
  public getElements():Observable<Carrousel[]>{
    return of(home.promos)
  }

  public getName():any{
    return I18N.carrousel.promos
  }

  public createElemento(elemento:Carrousel):Observable<any>{
    return of(home.promos)
  }

  public deleteElemento(id:number): Observable<void>{
    return of(undefined);
  }

  public editElemento(elemento:Carrousel):Observable<any>{
    return of(home.promos)
  }
}
