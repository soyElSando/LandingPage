import { Component } from '@angular/core';
import { ProyectosService } from './proyectos.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent {
  constructor(private ProyectosService: ProyectosService) { }
  servicio= this.ProyectosService
}
