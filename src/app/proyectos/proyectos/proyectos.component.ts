import { Component } from '@angular/core';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent {
  proyectos = [
    {
      id: 1,
      nombre: "Proyecto1",
      imagen:"https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/757_iss044e020824.jpg",
      descripcion:"Un proyecto de prueba1",
      link:"https://www.youtube.com/",
    },
    {
      id: 2,
      nombre: "Proyecto2",
      imagen:"https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/2-1-2023_rst_courtney_lee_portraits_1-2.jpg",
      descripcion:"Un proyecto de prueba2",
      link:"https://www.youtube.com/",
    },
    {
      id: 3,
      nombre: "Proyecto3",
      imagen:"https://www.nasa.gov/sites/default/files/styles/full_width/public/thumbnails/image/web_first_images_release_0.png?itok=eP3obzhq",
      descripcion:"Un proyecto de prueba3",
      link:"https://www.youtube.com/",
    }
  ]
}
