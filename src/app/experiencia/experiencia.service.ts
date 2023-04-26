import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Experiencia } from './Experiencia.model';
import experiencia from 'src/assets/mockBD/experiencia.json'

@Injectable({
  providedIn: 'root'
})

//implementacion con mockBD
export class ExperienciaService {

  public getExperiencias():Observable<Experiencia[]>{
    return of(experiencia.experiencia)
  }

  public updateExperiencia(expLab: Experiencia):Observable<Experiencia[]>{
    return of(experiencia.experiencia)
  }
  public deleteExperiencia(id: number):Observable<Experiencia[]>{
    return of(experiencia.experiencia)
  }
  public createExperiencia(expLab: Experiencia):Observable<Experiencia[]>{
    return of(experiencia.experiencia)
  }
}

//implementacion con backend
/* export class ExperienciaService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

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

}
 */