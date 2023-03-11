import { Component } from '@angular/core';
import { Banner } from 'src/app/models/banner.model';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent {
  proyectos:Banner[] = [
    {
      id: 1,
      nombre: "Proyecto1",
      imagen:"https://lonelyplanetes.cdnstatics2.com/sites/default/files/fotos/Marruecos_Chefcahouen_500px_103832325_Gareth%20Bell_500px.jpg",
      descripcion:"Un proyecto de prueba1",
      link:"https://www.youtube.com/",
    },
    {
      id: 2,
      nombre: "Proyecto2",
      imagen:"https://lonelyplanetes.cdnstatics2.com/sites/default/files/fotos/Marruecos_Casablanca_LPT0517_110_Philip%20Lee%20Harvey_Lonely%20Planet.jpg",
      descripcion:"Un proyecto de prueba2",
      link:"https://www.youtube.com/",
    },
    {
      id: 3,
      nombre: "Proyecto3",
      imagen:"https://lonelyplanetes.cdnstatics2.com/sites/default/files/fotos/Marruecos_Sahara_shutterstock_717589531_Igor%20from%20Sarajevo_Shutterstock.jpg",
      descripcion:"Un proyecto de prueba3",
      link:"https://www.youtube.com/",
    }
  ]
}
