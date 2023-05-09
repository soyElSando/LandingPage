import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoriaSkill, CategoriaSkillWithId } from './CategoriaSkill.model';
import { Skill, SkillWithId } from './Skill.model';
import conocimientos from 'src/assets/mockBD/skill.json'
import categoriaSkill from 'src/assets/mockBD/categoriaSkill.json'
import I18N from 'src/assets/I18n.json'
import { LanguageService } from '../Shared/services/language.service';

@Injectable({
  providedIn: 'root'
})

export class SkillService {

  private useMock = environment.mockDB;
  private apiUrl = environment.apiBaseUrl;
  esEspanolSub: Subscription = new Subscription;

  constructor( private http: HttpClient, private languageService: LanguageService) { } 
  idiomaEspanol:boolean =true

  ngOnInit() {
    this.esEspanolSub = this.languageService.esEspanol.subscribe((isAuthenticated: boolean)=>{
      this.idiomaEspanol = isAuthenticated
    })
  }

  ngOnDestroy() {
    this.esEspanolSub.unsubscribe();
  }

  public getSkills(): Observable<SkillWithId[]>{
    if (this.useMock) {
      return of(conocimientos.conocimientos);
    } else {
      return this.http.get<SkillWithId[]>( this.apiUrl + '/Skills/todos');
    }
  }

  public updateSkill(skill: SkillWithId): Observable<any>{
    if (this.useMock) {
      const index = conocimientos.conocimientos.findIndex(e => e.idSkill === skill.idSkill);
      if (index >= 0) {
        const updatedElemento = { ...skill };
        conocimientos.conocimientos[index] = updatedElemento;
        return of(updatedElemento);
      } else {
        return throwError(this.idiomaEspanol ? I18N.error.request.es : I18N.error.request.en);
      }
    } else {
      return this.http.put<Skill>(`${this.apiUrl}/Skills/editar`, skill);
    }
  } 

  public createSkill(skill: Skill): Observable<any>{
    if (this.useMock) {
      const newId = conocimientos.conocimientos.length + 1;
      const newElemento = { idSkill: newId, ...skill };
      conocimientos.conocimientos.push(newElemento);
      return of(newElemento);
    } else {
      return this.http.post<Skill>(this.apiUrl + '/Skills/agregar', skill);
    }
  }

  public deleteSkill(id: number): Observable<void>{
    if (this.useMock) {
      const index = conocimientos.conocimientos.findIndex(e => e.idSkill === id);
      if (index >= 0) {
        conocimientos.conocimientos.splice(index, 1);
        return of(undefined);
      } else {
        return throwError('Element not found');
      }
    } else {
      return this.http.delete<void>(this.apiUrl + '/Skills/eliminar/' + id);
    }
  }

  // Metodos para las categorias de Skills
  public getCateSkills(): Observable<CategoriaSkillWithId[]>{
    if (this.useMock) {
      return of(categoriaSkill.categoriaSkill);
    } else {
      return this.http.get<CategoriaSkillWithId[]>( this.apiUrl + '/CategoriasSkill/todos');
    }
  }

  public updateCateSkill(cateSkill: CategoriaSkillWithId): Observable<any>{
    if (this.useMock) {
      const index = categoriaSkill.categoriaSkill.findIndex(e => e.idCatSkill === cateSkill.idCatSkill);
      if (index >= 0) {
        const updatedElemento = { ...cateSkill };
        categoriaSkill.categoriaSkill[index] = updatedElemento;
        return of(updatedElemento);
      } else {
        return throwError('Element not found');
      }
    } else {
      return this.http.put<CategoriaSkillWithId>(`${this.apiUrl}/CategoriasSkills/editar`, cateSkill);
    }
  } 

  public createCateSkill(cateSkill: CategoriaSkill): Observable<any>{
    if (this.useMock) {
      const newId = categoriaSkill.categoriaSkill.length + 1;
      const newElemento = { idCatSkill: newId, ...cateSkill };
      categoriaSkill.categoriaSkill.push(newElemento);
      return of(newElemento);
    } else {
      return this.http.post<CategoriaSkill>(this.apiUrl + '/CategoriasSkill/agregar', cateSkill);
    }
  }

  public deleteCateSkill(id: number): Observable<void>{
    if (this.useMock) {
      const index = categoriaSkill.categoriaSkill.findIndex(e => e.idCatSkill === id);
      if (index >= 0) {
        categoriaSkill.categoriaSkill.splice(index, 1);
        return of(undefined);
      } else {
        return throwError('Element not found');
      }
    } else {
      return this.http.delete<void>(this.apiUrl + '/CategoriasSkill/eliminar/' + id);
    }
  }

}