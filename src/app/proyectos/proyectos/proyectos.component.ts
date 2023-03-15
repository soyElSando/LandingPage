import { Component } from '@angular/core';
import { Carrousel } from 'src/app/models/Carrousel.model';
import { ProyectosService } from './proyectos.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent {
  constructor(private ProyectosService: ProyectosService) { }
  proyectos :Carrousel[]= this.ProyectosService.getProyectos()
}
