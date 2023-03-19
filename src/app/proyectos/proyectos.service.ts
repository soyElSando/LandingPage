import { Injectable } from '@angular/core';
import { Carrousel } from '../models/Carrousel.model';
import proyectos from 'src/assets/mockBD/proyectos.json'

@Injectable({
  providedIn: 'root'
})

//implementacion con mockBD
export class ProyectosService {

  public getProyectos():Carrousel[]{
    return proyectos.proyectos
  }
}
