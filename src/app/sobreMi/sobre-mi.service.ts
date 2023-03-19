import { Injectable } from '@angular/core';
import sobreMi from 'src/assets/mockBD/sobreMi.json';
import { SobreMi } from '../models/SobreMi.model';

@Injectable({
  providedIn: 'root'
})

//implementacion con mockBD
export class SobreMiService {

  public getSobreMi():SobreMi{
    return sobreMi
  }
}
