import { Component, Input } from '@angular/core';
import { Carrousel } from 'src/app/models/Carrousel.model';
import { LanguageService } from '../services/language.service';
import I18n from 'src/assets/I18n.json'
import { Subscription } from 'rxjs';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent {

  @Input()  carrouselId!: string ;

  idiomaEspanol:boolean =true
  link = I18n.boton.link

  @Input()  elementos: Carrousel[] =
  [{
    id: 0,
    nombreEn: "Site under construction",
    nombreEs: "Sitio en construcción",
    imagen:"https://www.nasa.gov/sites/default/files/styles/full_width/public/thumbnails/image/web_first_images_release_0.png?itok=eP3obzhq",
    descripcionEs:"error 404",
    descripcionEn:"404 error",
    link:"",
  }];

  esEspanolSub: Subscription = new Subscription;

  constructor(private languageService: LanguageService, private _loginService: LoginService) {
  }

  ngOnInit() {
    this.esEspanolSub = this.languageService.esEspanol.subscribe((isAuthenticated: boolean)=>{
      this.idiomaEspanol = isAuthenticated
    })
  }

  ngOnDestroy() {
    this.esEspanolSub.unsubscribe();
  }

  estaLogueado = () => {
    return this._loginService.isLoggedIn();
  }
}