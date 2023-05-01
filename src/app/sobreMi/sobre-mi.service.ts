import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import sobreMi from 'src/assets/mockBD/sobreMi.json';
import { SobreMi } from '../models/SobreMi.model';

@Injectable({
  providedIn: 'root'
})

//implementacion con mockBD
export class SobreMiService {

  private onEditEvent: EventEmitter<any> = new EventEmitter();

  public getSobreMi():Observable<SobreMi>{
    return of(sobreMi)
  }

  public updateSobreMi(sobreMi:SobreMi):Observable<SobreMi>{
    this.onEditEvent.emit();
    return of(sobreMi)
  }

  getOnEditEvent(): Observable<any> {
    return this.onEditEvent.asObservable();
  }
}