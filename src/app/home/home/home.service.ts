import { Injectable } from '@angular/core';
import { Carrousel } from '../../models/Carrousel.model';
import home from 'src/assets/mockBD/home.json'

@Injectable({
  providedIn: 'root'
})

//implementacion con mockBD
export class HomeService {
  
  public getPromos():Carrousel[]{
    return home.promos
  }
}
