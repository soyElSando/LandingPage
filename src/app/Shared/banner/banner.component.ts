import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {

  @Input()  elementos: any =
  [{
    id: 0,
    nombre: "Site under construction",
    imagen:"https://www.nasa.gov/sites/default/files/styles/full_width/public/thumbnails/image/web_first_images_release_0.png?itok=eP3obzhq",
    descripcion:"Site under construction",
    link:"",
  }];

  estaLogueado = () => {
    return false;
  }
}