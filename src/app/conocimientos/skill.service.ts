import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoriaSkill, CategoriaSkillWithId } from './CategoriaSkill.model';
import { Skill, SkillWithID } from './Skill.model';
import conocimientos from 'src/assets/mockBD/skill.json'
import categoriaSkill from 'src/assets/mockBD/categoriaSkill.json'
import I18N from 'src/assets/I18n.json'
import { LanguageService } from '../Shared/services/language.service';

@Injectable({
  providedIn: 'root'
})

export class SkillService {

  private apiUrl = environment.apiBaseUrl+'/api/skill';
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

  //Implementacion con MockBD

  public getSkills(): Observable<Skill[]>{
    return of(conocimientos.conocimientos);
  }

  public updateSkill(skill: SkillWithID): Observable<any>{

    const index = conocimientos.conocimientos.findIndex(e => e.idSkill === skill.idSkill);
    if (index >= 0) {
      const updatedElemento = { ...skill };
      conocimientos.conocimientos[index] = updatedElemento;
      return of(updatedElemento);
    } else {
      return throwError('Element not found');
    }
  } 

  public createSkill(skill: Skill): Observable<any>{
    const newId = conocimientos.conocimientos.length + 1;
    const newElemento = { idSkill: newId, ...skill };
    conocimientos.conocimientos.push(newElemento);
    return of(newElemento);
  }

  public deleteSkill(id: number): Observable<void>{
    const index = conocimientos.conocimientos.findIndex(e => e.idSkill === id);
    if (index >= 0) {
      conocimientos.conocimientos.splice(index, 1);
      return of(undefined);
    } else {
      return throwError('Element not found');
    }
  }

  // Metodos para las categorias de Skills
  public getCateSkills(): Observable<CategoriaSkill[]>{
    return of(categoriaSkill.categoriaSkill);
  }

  public updateCateSkill(cateSkill: CategoriaSkillWithId): Observable<any>{

    const index = categoriaSkill.categoriaSkill.findIndex(e => e.idCatSkill === cateSkill.idCatSkill);
    if (index >= 0) {
      const updatedElemento = { ...cateSkill };
      categoriaSkill.categoriaSkill[index] = updatedElemento;
      return of(updatedElemento);
    } else {
      return throwError('Element not found');
    }
  } 

  public createCateSkill(cateSkill: CategoriaSkill): Observable<any>{
    const newId = categoriaSkill.categoriaSkill.length + 1;
    const newElemento = { idCatSkill: newId, ...cateSkill };
    categoriaSkill.categoriaSkill.push(newElemento);
    return of(newElemento);
  }

  public deleteCateSkill(id: number): Observable<void>{
    const index = categoriaSkill.categoriaSkill.findIndex(e => e.idCatSkill === id);
    if (index >= 0) {
      categoriaSkill.categoriaSkill.splice(index, 1);
      return of(undefined);
    } else {
      return throwError('Element not found');
    }
  }

}


//IMPLMENTACION CON BACKEND
/* 
  public getSkills(): Observable<Skill[]>{
    return this.http.get<Skill[]>( this.apiServerUrl + '/Skills/todas');
  }

  public updateSkill(skill: SkillWithId): Observable<any>{

    return this.http.put<Skill>(`${this.apiServerUrl}/Skills/editar`, skill);
  } 

  public createSkill(skill: Skill): Observable<any>{
    return this.http.post<Skill>(this.apiServerUrl + '/Skills/agregar', skill);
  }

//  public deleteSkillsByIds(ids: number[]): Observable<any>{
//   return this.http.delete<void>(this.apiServerUrl + '/Skills/eliminar-varias', ids)
//  } 

  public deleteSkill(id: number): Observable<void>{
    return this.http.delete<void>(this.apiServerUrl + '/Skills/eliminar/' + id);
  }

  // Metodos para las categorias de Skills
  public getCateSkills(): Observable<CategoriaSkill[]>{
    return this.http.get<CategoriaSkill[]>( this.apiServerUrl + '/CategoriasSkill/todos');
  }

  public updateCateSkill(cateSkill: CategoriaSkillWithId): Observable<any>{

    return this.http.put<CategoriaSkill>(`${this.apiServerUrl}/CategoriasSkills/editar`, cateSkill);
  } 

  public createCateSkill(cateSkill: CategoriaSkill): Observable<any>{
    return this.http.post<CategoriaSkill>(this.apiServerUrl + '/CategoriasSkill/agregar', cateSkill);
  }

  public deleteCateSkill(id: number): Observable<void>{
    return this.http.delete<void>(this.apiServerUrl + '/CategoriasSkill/eliminar/' + id);
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(this.idiomaEspanol ? I18N.error.request.es : I18N.error.request.en);
  } 
}
 */