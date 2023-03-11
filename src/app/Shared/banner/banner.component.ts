import { Component, Input } from '@angular/core';
import { Banner } from 'src/app/models/banner.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {

  static instancia:number = 1;

  bannerId:string;

  @Input()  elementos: Banner[] =
  [{
    id: 0,
    nombre: "Site under construction",
    imagen:"https://www.nasa.gov/sites/default/files/styles/full_width/public/thumbnails/image/web_first_images_release_0.png?itok=eP3obzhq",
    descripcion:"Site under construction",
    link:"",
  }];

  constructor() {
    this.bannerId = "banner"+(++BannerComponent.instancia);
  }
  estaLogueado = () => {
    return false;
  }
}