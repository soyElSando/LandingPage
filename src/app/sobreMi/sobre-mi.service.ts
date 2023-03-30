import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import sobreMi from 'src/assets/mockBD/sobreMi.json';
import { SobreMi } from '../models/SobreMi.model';

@Injectable({
  providedIn: 'root'
})

//implementacion con mockBD
export class SobreMiService {

  public getSobreMi():Observable<SobreMi>{
    return of(sobreMi)
  }
}