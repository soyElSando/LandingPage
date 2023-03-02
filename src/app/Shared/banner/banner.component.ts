import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {

  proyectos = [{
    idProy: 0,
    nombreProy: "Prueba",
    imagenProy:"https://www.nasa.gov/sites/default/files/styles/full_width/public/thumbnails/image/web_first_images_release_0.png?itok=eP3obzhq",
    descripcionProy:"Un proyecto de prueba",
    linkProy:"https://www.youtube.com/",
  },
  {
    idProy: 1,
    nombreProy: "Prueba2",
    imagenProy:"https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/757_iss044e020824.jpg",
    descripcionProy:"Un proyecto de prueba2",
    linkProy:"https://www.youtube.com/",
  },
  {
    idProy: 3,
    nombreProy: "Prueba3",
    imagenProy:"https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/2-1-2023_rst_courtney_lee_portraits_1-2.jpg",
    descripcionProy:"Un proyecto de prueba3",
    linkProy:"https://www.youtube.com/",
  }]
  
  estaLogueado = () => {
    return false;
  }
}