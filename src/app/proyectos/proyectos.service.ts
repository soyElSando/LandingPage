import { Injectable } from '@angular/core';
import { Carrousel } from '../models/Carrousel.model';
import proyectos from 'src/assets/mockBD/proyectos.json'
import { Observable, of } from 'rxjs';
import I18N from 'src/assets/I18n.json'

@Injectable({
  providedIn: 'root'
})

//implementacion con mockBD
export class ProyectosService {

  public getElements():Observable<Carrousel[]>{
    return of(proyectos.proyectos)
  }

  public getName():any{
    return I18N.carrousel.proyectos
  }

  public createElemento(elemento:Carrousel):Observable<any>{
    return of(proyectos.proyectos)
  }

  public deleteElemento(id:number): Observable<void>{
    return of(undefined);
  }

  public editElemento(elemento:Carrousel):Observable<any>{
    return of(proyectos.proyectos)
  }
}
