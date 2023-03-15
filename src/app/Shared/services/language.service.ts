import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private _esEspanol = new BehaviorSubject<boolean>(true); // Valor predeterminado en Español

  toogleLanguage() {
    this._esEspanol.next(!this._esEspanol.getValue());
  }
  get esEspanol() {
    return this._esEspanol.asObservable();
  }
}
